import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Braces, Copy, Check, AlertCircle } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>JSON Formatter & Validator | CosmosDev</title>
        <meta name="description" content="Format, validate, and minify JSON data online. Pretty print JSON with syntax highlighting." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-primary/20">
            <Braces size={24} className="text-accent-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">JSON Formatter & Validator</h1>
            <p className="text-text-secondary">Pretty print and validate JSON data</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">Input JSON</label>
              <div className="flex gap-2">
                <button onClick={format} className="btn-primary text-sm">Format</button>
                <button onClick={minify} className="btn-secondary text-sm">Minify</button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='{"key": "value"}'
              className="tool-input h-64"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">Output</label>
              <button
                onClick={copyToClipboard}
                disabled={!output}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary disabled:opacity-50"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <textarea
              value={error ? '' : output}
              readOnly
              placeholder="Formatted JSON will appear here..."
              className={`tool-input h-64 ${error ? 'border-red-500' : ''}`}
            />
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-500/10 rounded-md">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}