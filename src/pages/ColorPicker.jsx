import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Palette, Copy, Check } from 'lucide-react';
import AdSlot from '../components/AdSlot';

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
};

export default function ColorPicker() {
  const [color, setColor] = useState('#6366f1');
  const [copied, setCopied] = useState('');

  const rgb = hexToRgb(color);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  const formatRgb = () => rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : '';
  const formatHsl = () => hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : '';

  return (
    <>
      <Helmet>
        <title>Color Picker | CosmosDev</title>
        <meta name="description" content="Pick colors and convert between HEX, RGB, and HSL formats." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-tertiary/20">
            <Palette size={24} className="text-accent-tertiary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Color Picker</h1>
            <p className="text-text-secondary">Pick colors and convert formats</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div
                className="w-40 h-40 rounded-lg border-4 border-border-color"
                style={{ backgroundColor: color }}
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">HEX</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-12 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <input
                    type="text"
                    value={color.toUpperCase()}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) setColor(val);
                    }}
                    className="input-field flex-1 font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(color.toUpperCase(), 'hex')}
                    className="p-3 rounded-md bg-bg-tertiary border border-border-color hover:bg-border-color"
                  >
                    {copied === 'hex' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">RGB</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formatRgb()}
                    readOnly
                    className="input-field flex-1 font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(formatRgb(), 'rgb')}
                    className="p-3 rounded-md bg-bg-tertiary border border-border-color hover:bg-border-color"
                  >
                    {copied === 'rgb' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">HSL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formatHsl()}
                    readOnly
                    className="input-field flex-1 font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(formatHsl(), 'hsl')}
                    className="p-3 rounded-md bg-bg-tertiary border border-border-color hover:bg-border-color"
                  >
                    {copied === 'hsl' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border-color">
            <label className="text-sm font-medium text-text-secondary mb-3 block">Preview</label>
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => {
                const lightness = 20 + i * 15;
                const testColor = `hsl(${hsl?.h || 0}, ${hsl?.s || 0}%, ${lightness}%)`;
                return (
                  <div
                    key={i}
                    className="h-16 rounded-md border border-border-color cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: testColor }}
                    onClick={() => setColor(testColor)}
                  />
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