import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Copy, Check, AlertCircle } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('The quick brown fox jumps over the lazy dog.');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const test = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const matches = [];

      if (flags.includes('g')) {
        let match;
        while ((match = regex.exec(testString)) !== null) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          matches.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setResult(matches);
      setError(null);
    } catch (e) {
      setError(e.message);
      setResult(null);
    }
  };

  const toggleFlag = (flag) => {
    setFlags(prev =>
      prev.includes(flag) ? prev.replace(flag, '') : prev + flag
    );
  };

  return (
    <>
      <Helmet>
        <title>Regex Tester | CosmosDev</title>
        <meta name="description" content="Test regex patterns online with live match highlighting and group extraction." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-500/20">
            <Search size={24} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Regex Tester</h1>
            <p className="text-text-secondary">Test regex patterns online</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Pattern</label>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="input-field font-mono"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Flags</label>
            <div className="flex gap-3">
              {[
                { flag: 'g', label: 'Global' },
                { flag: 'i', label: 'Case Insensitive' },
                { flag: 'm', label: 'Multiline' },
              ].map(({ flag, label }) => (
                <label key={flag} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flags.includes(flag)}
                    onChange={() => toggleFlag(flag)}
                    className="w-4 h-4 rounded accent-accent-primary"
                  />
                  <span className="text-sm text-text-secondary">{label} ({flag})</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Test String</label>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="tool-input h-40"
            />
          </div>

          <button onClick={test} className="btn-primary w-full">
            Test Pattern
          </button>

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-500/10 rounded-md">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-3">
              <div className="text-sm text-text-secondary">
                {result.length} match{result.length !== 1 ? 'es' : ''} found
              </div>

              <div className="p-4 rounded-lg bg-bg-tertiary border border-border-color font-mono text-sm whitespace-pre-wrap">
                {testString.split('').map((char, i) => {
                  const match = result.find(m => i >= m.index && i < m.index + m.text.length);
                  return (
                    <span
                      key={i}
                      className={match ? 'bg-accent-primary/30 text-accent-primary' : 'text-text-primary'}
                    >
                      {char}
                    </span>
                  );
                })}
              </div>

              {result.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Match Details</label>
                  {result.map((match, i) => (
                    <div key={i} className="p-3 rounded-lg bg-bg-tertiary">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded bg-accent-primary/20 text-accent-primary text-xs">
                          Match {i + 1}
                        </span>
                        <span className="text-text-tertiary text-xs">Index: {match.index}</span>
                      </div>
                      <code className="text-text-primary break-all">{match.text}</code>
                      {match.groups.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-border-color">
                          <span className="text-text-tertiary text-xs">Groups: </span>
                          {match.groups.map((g, j) => (
                            <span key={j} className="ml-2 text-accent-secondary">{g || '(empty)'}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}