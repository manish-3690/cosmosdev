import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Binary, Copy, Check } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function NumberBase() {
  const [input, setInput] = useState('');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(16);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const bases = [
    { value: 2, label: 'Binary (2)' },
    { value: 8, label: 'Octal (8)' },
    { value: 10, label: 'Decimal (10)' },
    { value: 16, label: 'Hexadecimal (16)' },
  ];

  const convert = () => {
    try {
      const num = parseInt(input, fromBase);
      if (isNaN(num)) {
        setOutput('Invalid input');
        return;
      }
      setOutput(num.toString(toBase).toUpperCase());
    } catch (e) {
      setOutput('Error converting');
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
        <title>Number Base Converter | CosmosDev</title>
        <meta name="description" content="Convert numbers between binary, octal, decimal, and hexadecimal bases." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-tertiary/20">
            <Binary size={24} className="text-accent-tertiary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Number Base Converter</h1>
            <p className="text-text-secondary">Convert between number bases</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-text-secondary">From Base</label>
              <select
                value={fromBase}
                onChange={(e) => setFromBase(parseInt(e.target.value))}
                className="input-field"
              >
                {bases.map(b => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-text-secondary">To Base</label>
              <select
                value={toBase}
                onChange={(e) => setToBase(parseInt(e.target.value))}
                className="input-field"
              >
                {bases.map(b => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Input Number</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Enter number in base ${fromBase}...`}
              className="input-field font-mono text-lg"
            />
          </div>

          <button onClick={convert} className="btn-primary w-full">
            Convert
          </button>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">Result</label>
              <button
                onClick={copyToClipboard}
                disabled={!output}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary disabled:opacity-50"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-4 rounded-lg bg-bg-tertiary border border-border-color">
              <span className="text-xl font-mono text-accent-primary">{output || 'Result will appear here...'}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-text-primary mb-4">Quick Reference</h3>
          <div className="grid grid-cols-4 gap-2 text-sm font-mono">
            <div className="p-2 rounded bg-bg-tertiary text-center">
              <div className="text-text-tertiary mb-1">Dec</div>
              <div className="text-text-primary">0-9</div>
            </div>
            <div className="p-2 rounded bg-bg-tertiary text-center">
              <div className="text-text-tertiary mb-1">Hex</div>
              <div className="text-text-primary">0-9 A-F</div>
            </div>
            <div className="p-2 rounded bg-bg-tertiary text-center">
              <div className="text-text-tertiary mb-1">Oct</div>
              <div className="text-text-primary">0-7</div>
            </div>
            <div className="p-2 rounded bg-bg-tertiary text-center">
              <div className="text-text-tertiary mb-1">Bin</div>
              <div className="text-text-primary">0-1</div>
            </div>
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}