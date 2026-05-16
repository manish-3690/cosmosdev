import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Database, Download, Copy, Check, AlertCircle } from 'lucide-react';
import AdSlot from '../components/AdSlot';
import { useWaitlist } from '../components/WaitlistContext';

export default function JsonToXml() {
  const { openWaitlist } = useWaitlist();
  const [json, setJson] = useState('');
  const [xml, setXml] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const escapeXml = (str) => {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const convertToXml = (obj, rootName = 'root', indent = 0) => {
    const spaces = '  '.repeat(indent);

    if (obj === null || obj === undefined) {
      return `${spaces}<${rootName}/>`;
    }

    if (typeof obj !== 'object') {
      return `${spaces}<${rootName}>${escapeXml(obj)}</${rootName}>`;
    }

    if (Array.isArray(obj)) {
      return obj.map((item, i) =>
        convertToXml(item, 'item', indent) +
        (i < obj.length - 1 ? '\n' : '')
      ).join('\n');
    }

    const entries = Object.entries(obj);
    if (entries.length === 0) {
      return `${spaces}<${rootName}/>`;
    }

    const children = entries.map(([key, value]) => {
      const tagName = key.replace(/[^a-zA-Z0-9_-]/g, '_');
      return convertToXml(value, tagName, indent + 1);
    }).join('\n');

    return `${spaces}<${rootName}>\n${children}\n${spaces}</${rootName}>`;
  };

  const convert = () => {
    try {
      const data = JSON.parse(json);
      const xmlString = convertToXml(data);
      setXml(xmlString);
      setError(null);
    } catch (e) {
      setError(e.message);
      setXml('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadXml = () => {
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>JSON to XML Converter | CosmosDev</title>
        <meta name="description" content="Convert JSON to XML format. Download or copy the result." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-500/20">
            <Database size={24} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">JSON to XML</h1>
            <p className="text-text-secondary">Convert JSON to XML format</p>
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
              placeholder='{"name": "John", "age": 30}'
              className="tool-input h-64"
            />
            <button onClick={convert} className="btn-primary w-full">
              Convert to XML
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">XML Output</label>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!xml}
                  className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-50"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={downloadXml}
                  disabled={!xml}
                  className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary disabled:opacity-50"
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
            <textarea
              value={xml}
              readOnly
              placeholder="XML will appear here..."
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