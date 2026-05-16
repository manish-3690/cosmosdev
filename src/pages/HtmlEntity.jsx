import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Code, Copy, Check } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function HtmlEntity() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [copied, setCopied] = useState(false);

  const encodeEntities = (str) => {
    return str.replace(/[ -￿<>&"]/g, (char) => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        ' ': '&nbsp;'
      };
      return entities[char] || '&#' + char.charCodeAt(0) + ';';
    });
  };

  const decodeEntities = (str) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  };

  const convert = () => {
    try {
      if (mode === 'encode') {
        setOutput(encodeEntities(input));
      } else {
        setOutput(decodeEntities(input));
      }
    } catch (e) {
      setOutput('Error: Invalid input');
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
        <title>HTML Entity Encoder/Decoder | CosmosDev</title>
        <meta name="description" content="Encode and decode HTML entities online. Convert special characters to HTML entities and back." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-primary/20">
            <Code size={24} className="text-accent-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">HTML Entity Encoder/Decoder</h1>
            <p className="text-text-secondary">Encode and decode HTML special characters</p>
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
              {mode === 'encode' ? 'Text to Encode' : 'HTML Entities to Decode'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text with special chars...' : 'Enter HTML entities...'}
              className="tool-input h-48"
            />
            <button onClick={convert} className="btn-primary w-full">
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </button>
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