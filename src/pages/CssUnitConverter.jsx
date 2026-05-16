import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Cpu, Copy, Check } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function CssUnitConverter() {
  const [value, setValue] = useState(16);
  const [unit, setUnit] = useState('px');
  const [baseFontSize, setBaseFontSize] = useState(16);
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const conversions = {
    px: value,
    rem: value * baseFontSize,
    em: value * baseFontSize,
    '%': (value / baseFontSize) * 100,
    vw: (value / 1920) * 100,
    vh: (value / 1080) * 100,
  };

  const units = ['px', 'rem', 'em', '%', 'vw', 'vh'];

  return (
    <>
      <Helmet>
        <title>CSS Unit Converter | CosmosDev</title>
        <meta name="description" content="Convert between CSS length units: px, rem, em, vh, vw." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-tertiary/20">
            <Cpu size={24} className="text-accent-tertiary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">CSS Unit Converter</h1>
            <p className="text-text-secondary">Convert CSS length units</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Base Font Size (px)</label>
            <input
              type="number"
              value={baseFontSize}
              onChange={(e) => setBaseFontSize(parseFloat(e.target.value) || 16)}
              className="input-field w-32"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-text-secondary">Value</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                className="input-field text-lg"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-text-secondary">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="input-field"
              >
                {units.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Conversions</label>
            <div className="space-y-2">
              {units.map((u) => {
                const converted = u === 'px' ? value * baseFontSize :
                                  u === 'rem' || u === 'em' ? value / baseFontSize :
                                  u === '%' ? (value / baseFontSize) * 100 :
                                  conversions[u] || 0;

                return (
                  <div key={u} className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary">
                    <span className="text-text-secondary">{u}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-text-primary">{converted.toFixed(4).replace(/\.?0+$/, '')}</span>
                      <button
                        onClick={() => copyToClipboard(converted.toFixed(4).replace(/\.?0+$/, ''), u)}
                        className="p-1 hover:bg-bg-secondary rounded"
                      >
                        {copied === u ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-text-tertiary" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}