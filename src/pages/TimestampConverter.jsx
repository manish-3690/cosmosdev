import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, Copy, Check, RefreshCw } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function TimestampConverter() {
  const [mode, setMode] = useState('to');
  const [timestamp, setTimestamp] = useState(Math.floor(Date.now() / 1000));
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const now = () => {
    const now = Date.now();
    setTimestamp(Math.floor(now / 1000));
    setDate(new Date(now).toISOString().slice(0, 16));
  };

  const convertFromTimestamp = () => {
    try {
      const dateObj = new Date(timestamp * 1000);
      setDate(dateObj.toISOString().slice(0, 16));
    } catch (e) {
      setDate('Invalid timestamp');
    }
  };

  const convertToTimestamp = () => {
    try {
      const dateObj = new Date(date);
      if (!isNaN(dateObj.getTime())) {
        setTimestamp(Math.floor(dateObj.getTime() / 1000));
      }
    } catch (e) {}
  };

  return (
    <>
      <Helmet>
        <title>Unix Timestamp Converter | CosmosDev</title>
        <meta name="description" content="Convert Unix timestamps to human-readable dates and vice versa." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-tertiary/20">
            <Clock size={24} className="text-accent-tertiary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Unix Timestamp Converter</h1>
            <p className="text-text-secondary">Convert timestamps to dates and vice versa</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setMode('to')}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${mode === 'to' ? 'bg-accent-primary text-white' : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'}`}
          >
            Timestamp → Date
          </button>
          <button
            onClick={() => setMode('from')}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${mode === 'from' ? 'bg-accent-primary text-white' : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'}`}
          >
            Date → Timestamp
          </button>
        </div>

        {mode === 'to' ? (
          <div className="card space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-text-secondary">Unix Timestamp (seconds)</label>
                <button onClick={now} className="flex items-center gap-2 text-sm text-accent-primary hover:text-accent-secondary">
                  <RefreshCw size={14} />
                  Now
                </button>
              </div>
              <input
                type="number"
                value={timestamp}
                onChange={(e) => setTimestamp(e.target.value)}
                className="input-field font-mono text-lg"
              />
              <button onClick={convertFromTimestamp} className="btn-primary w-full">
                Convert
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-text-secondary">Result</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={date}
                  readOnly
                  className="input-field flex-1 font-mono"
                />
                <button
                  onClick={() => copyToClipboard(date, 'date')}
                  className="p-3 rounded-md bg-bg-tertiary border border-border-color hover:bg-border-color"
                >
                  {copied === 'date' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-bg-tertiary">
                <span className="text-text-tertiary">Milliseconds:</span>
                <span className="ml-2 font-mono text-text-primary">{timestamp * 1000}</span>
              </div>
              <div className="p-3 rounded-lg bg-bg-tertiary">
                <span className="text-text-tertiary">UTC:</span>
                <span className="ml-2 font-mono text-text-primary">{new Date(timestamp * 1000).toUTCString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="card space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-text-secondary">Date & Time</label>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-field"
              />
              <button onClick={convertToTimestamp} className="btn-primary w-full">
                Convert
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-text-secondary">Result</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={timestamp}
                  readOnly
                  className="input-field flex-1 font-mono text-lg"
                />
                <button
                  onClick={() => copyToClipboard(String(timestamp), 'timestamp')}
                  className="p-3 rounded-md bg-bg-tertiary border border-border-color hover:bg-border-color"
                >
                  {copied === 'timestamp' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-bg-tertiary">
                <span className="text-text-tertiary">Milliseconds:</span>
                <span className="ml-2 font-mono text-text-primary">{timestamp * 1000}</span>
              </div>
              <div className="p-3 rounded-lg bg-bg-tertiary">
                <span className="text-text-tertiary">UTC:</span>
                <span className="ml-2 font-mono text-text-primary">{new Date(timestamp * 1000).toUTCString()}</span>
              </div>
            </div>
          </div>
        )}

        <AdSlot position="bottom" />
      </div>
    </>
  );
}