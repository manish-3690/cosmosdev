import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Lock, Copy, Check, ArrowLeftRight } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function Base64() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [copied, setCopied] = useState(false);

  const convert = () => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setOutput('Error: Invalid input for ' + mode);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const swapMode = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput('');
  };

  return (
    <>
      <Helmet>
        <title>Base64 Encoder/Decoder | CosmosDev</title>
        <meta name="description" content="Encode and decode Base64 strings online. Convert text to Base64 and back." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-primary/20">
            <Lock size={24} className="text-accent-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Base64 Encoder/Decoder</h1>
            <p className="text-text-secondary">Encode and decode Base64 strings</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => { setMode('encode'); setInput(''); setOutput(''); }}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${mode === 'encode' ? 'bg-accent-primary text-white' : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'}`}
          >
            Encode
          </button>
          <button
            onClick={() => { setMode('decode'); setInput(''); setOutput(''); }}
            className={`flex-1 py-3 rounded-lg font-medium transition-colors ${mode === 'decode' ? 'bg-accent-primary text-white' : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'}`}
          >
            Decode
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">
              {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
              className="tool-input h-48"
            />
            <button onClick={convert} className="btn-primary w-full">
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">
                {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
              </label>
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
              value={output}
              readOnly
              placeholder="Result will appear here..."
              className="tool-input h-48"
            />
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}