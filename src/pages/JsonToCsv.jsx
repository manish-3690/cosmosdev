import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Database, Download, Copy, Check, AlertCircle, Lock } from 'lucide-react';
import AdSlot from '../components/AdSlot';
import { useWaitlist } from '../components/WaitlistContext';

export default function JsonToCsv() {
  const { openWaitlist } = useWaitlist();
  const [json, setJson] = useState('');
  const [csv, setCsv] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      const data = JSON.parse(json);

      if (!Array.isArray(data)) {
        throw new Error('JSON must be an array of objects');
      }

      if (data.length === 0) {
        setCsv('');
        setError(null);
        return;
      }

      const headers = Object.keys(data[0]);
      const csvRows = [];

      csvRows.push(headers.join(','));

      for (const row of data) {
        const values = headers.map(header => {
          const val = row[header];
          const escaped = String(val === null || val === undefined ? '' : val);
          return escaped.includes(',') || escaped.includes('"') || escaped.includes('\n')
            ? `"${escaped.replace(/"/g, '""')}"`
            : escaped;
        });
        csvRows.push(values.join(','));
      }

      setCsv(csvRows.join('\n'));
      setError(null);
    } catch (e) {
      setError(e.message);
      setCsv('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCsv = () => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>JSON to CSV Converter | CosmosDev</title>
        <meta name="description" content="Convert JSON arrays to CSV format. Download or copy the result." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-500/20">
            <Database size={24} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">JSON to CSV</h1>
            <p className="text-text-secondary">Convert JSON arrays to CSV format</p>
          </div>
          <button
            onClick={openWaitlist}
            className="pro-badge ml-auto cursor-pointer hover:opacity-80 transition-opacity"
          >
            Pro
          </button>
        </div>

        <AdSlot position="top" />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">JSON Input</label>
            <textarea
              value={json}
              onChange={(e) => setJson(e.target.value)}
              placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
              className="tool-input h-64"
            />
            <button onClick={convert} className="btn-primary w-full">
              Convert to CSV
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">CSV Output</label>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!csv}
                  className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-50"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={downloadCsv}
                  disabled={!csv}
                  className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-50"
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
            <textarea
              value={csv}
              readOnly
              placeholder="CSV will appear here..."
              className="tool-input h-64"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-500/10 rounded-md">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <AdSlot position="bottom" />
      </div>
    </>
  );
}