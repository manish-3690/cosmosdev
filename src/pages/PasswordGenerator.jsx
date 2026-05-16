import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Key, Copy, Check, RefreshCw } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    let chars = '';
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('Select at least one option');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    generate();
  }, []);

  return (
    <>
      <Helmet>
        <title>Password Generator | CosmosDev</title>
        <meta name="description" content="Generate secure random passwords with customizable length and character options." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-secondary/20">
            <Key size={24} className="text-accent-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Password Generator</h1>
            <p className="text-text-secondary">Generate secure random passwords</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-text-secondary">Password Length</label>
            <span className="text-lg font-semibold text-accent-primary">{length}</span>
          </div>
          <input
            type="range"
            min="8"
            max="128"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full accent-accent-primary"
          />
          <div className="flex items-center gap-4 text-sm">
            <span className="text-text-tertiary">8</span>
            <div className="flex-1 h-1 bg-bg-tertiary rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-primary transition-all"
                style={{ width: `${((length - 8) / 120) * 100}%` }}
              />
            </div>
            <span className="text-text-tertiary">128</span>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Character Types</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Uppercase (A-Z)', checked: uppercase, set: setUppercase },
                { label: 'Lowercase (a-z)', checked: lowercase, set: setLowercase },
                { label: 'Numbers (0-9)', checked: numbers, set: setNumbers },
                { label: 'Symbols (!@#$%)', checked: symbols, set: setSymbols },
              ].map((option) => (
                <label
                  key={option.label}
                  className="flex items-center gap-3 p-3 rounded-lg bg-bg-tertiary cursor-pointer hover:bg-border-color transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={option.checked}
                    onChange={(e) => option.set(e.target.checked)}
                    className="w-4 h-4 rounded accent-accent-primary"
                  />
                  <span className="text-sm text-text-primary">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={generate} className="btn-primary flex items-center gap-2 flex-1 justify-center">
              <RefreshCw size={18} />
              Generate
            </button>
          </div>

          <div className="relative">
            <input
              type="text"
              value={password}
              readOnly
              className="w-full pr-20 pl-4 py-4 rounded-lg bg-bg-tertiary border border-border-color text-lg font-mono text-text-primary"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-bg-secondary transition-colors"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} className="text-text-secondary" />}
            </button>
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}