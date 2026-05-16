import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { GitCompare, Copy, Check, Download } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function DiffChecker() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [diff, setDiff] = useState([]);

  const computeDiff = () => {
    const origLines = original.split('\n');
    const modLines = modified.split('\n');
    const result = [];

    const maxLen = Math.max(origLines.length, modLines.length);

    for (let i = 0; i < maxLen; i++) {
      const origLine = origLines[i];
      const modLine = modLines[i];

      if (origLine === undefined) {
        result.push({ type: 'added', content: modLine, lineNumber: i + 1 });
      } else if (modLine === undefined) {
        result.push({ type: 'removed', content: origLine, lineNumber: i + 1 });
      } else if (origLine !== modLine) {
        result.push({ type: 'removed', content: origLine, lineNumber: i + 1 });
        result.push({ type: 'added', content: modLine, lineNumber: i + 1 });
      } else {
        result.push({ type: 'unchanged', content: origLine, lineNumber: i + 1 });
      }
    }

    setDiff(result);
  };

  const getLineNumber = (type) => {
    return type === 'removed' ? '−' : type === 'added' ? '+' : ' ';
  };

  return (
    <>
      <Helmet>
        <title>Code Diff Checker | CosmosDev</title>
        <meta name="description" content="Compare two pieces of code side by side. See added and removed lines." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-500/20">
            <GitCompare size={24} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Code Diff Checker</h1>
            <p className="text-text-secondary">Compare two pieces of code</p>
          </div>
          <span className="pro-badge ml-auto">Pro</span>
        </div>

        <AdSlot position="top" />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Original</label>
            <textarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder="Paste original code..."
              className="tool-input h-64"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Modified</label>
            <textarea
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              placeholder="Paste modified code..."
              className="tool-input h-64"
            />
          </div>
        </div>

        <button onClick={computeDiff} className="btn-primary w-full">
          Compare
        </button>

        {diff.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">Diff Result</label>
              <div className="flex gap-4 text-sm">
                <span className="text-green-500">+ {diff.filter(d => d.type === 'added').length} added</span>
                <span className="text-red-500">− {diff.filter(d => d.type === 'removed').length} removed</span>
              </div>
            </div>
            <div className="rounded-lg bg-bg-secondary border border-border-color overflow-hidden">
              <div className="max-h-96 overflow-y-auto">
                {diff.map((line, i) => (
                  <div
                    key={i}
                    className={`flex font-mono text-sm ${
                      line.type === 'added' ? 'bg-green-500/10' :
                      line.type === 'removed' ? 'bg-red-500/10' : ''
                    }`}
                  >
                    <span className="w-8 flex-shrink-0 text-center py-1 text-text-tertiary border-r border-border-color">
                      {line.lineNumber}
                    </span>
                    <span className={`w-6 flex-shrink-0 text-center py-1 font-bold ${
                      line.type === 'added' ? 'text-green-500' :
                      line.type === 'removed' ? 'text-red-500' : 'text-text-tertiary'
                    }`}>
                      {getLineNumber(line.type)}
                    </span>
                    <pre className="px-3 py-1 flex-1 whitespace-pre-wrap">{line.content}</pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <AdSlot position="bottom" />
      </div>
    </>
  );
}