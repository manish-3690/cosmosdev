import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Palette, Copy, Check } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function ColorFormat() {
  const [input, setInput] = useState('#6366f1');
  const [color, setColor] = useState('#6366f1');
  const [copied, setCopied] = useState('');

  const parseColor = (str) => {
    let hex = '';
    let rgb = { r: 0, g: 0, b: 0 };
    let hsl = { h: 0, s: 0, l: 0 };

    if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(str)) {
      hex = str.length === 4
        ? '#' + str[1] + str[1] + str[2] + str[2] + str[3] + str[3]
        : str;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      rgb = { r, g, b };
    } else if (/^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i.test(str)) {
      const match = str.match(/\d+/g);
      rgb = { r: parseInt(match[0]), g: parseInt(match[1]), b: parseInt(match[2]) };
      hex = '#' + [rgb.r, rgb.g, rgb.b].map(x => x.toString(16).padStart(2, '0')).join('');
    } else if (/^hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/i.test(str)) {
      const match = str.match(/\d+/g);
      hsl = { h: parseInt(match[0]), s: parseInt(match[1]), l: parseInt(match[2]) };
      const rgbVals = hslToRgb(hsl.h, hsl.s, hsl.l);
      rgb = rgbVals;
      hex = '#' + [rgb.r, rgb.g, rgb.b].map(x => x.toString(16).padStart(2, '0')).join('');
    } else if (/^cmyk\(\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*,\s*\d+%?\s*\)$/i.test(str)) {
      const match = str.match(/\d+/g);
      const cmyk = { c: parseInt(match[0]), m: parseInt(match[1]), y: parseInt(match[2]), k: parseInt(match[3]) };
      const rgbVals = cmykToRgb(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
      rgb = rgbVals;
      hex = '#' + [rgb.r, rgb.g, rgb.b].map(x => x.toString(16).padStart(2, '0')).join('');
    } else {
      return { valid: false };
    }

    hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

    return {
      valid: true,
      hex: hex.toUpperCase(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      cmyk: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
    };
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToRgb = (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  };

  const rgbToCmyk = (r, g, b) => {
    if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
    const c = 1 - r / 255;
    const m = 1 - g / 255;
    const y = 1 - b / 255;
    const k = Math.min(c, m, y);
    return {
      c: Math.round((c - k) / (1 - k) * 100),
      m: Math.round((m - k) / (1 - k) * 100),
      y: Math.round((y - k) / (1 - k) * 100),
      k: Math.round(k),
    };
  };

  const cmykToRgb = (c, m, y, k) => {
    const r = 255 * (1 - c / 100) * (1 - k / 100);
    const g = 255 * (1 - m / 100) * (1 - k / 100);
    const b = 255 * (1 - y / 100) * (1 - k / 100);
    return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
  };

  const result = parseColor(input);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <>
      <Helmet>
        <title>Color Format Converter | CosmosDev</title>
        <meta name="description" content="Convert between color formats: HEX, RGB, HSL, and CMYK." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-tertiary/20">
            <Palette size={24} className="text-accent-tertiary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Color Format Converter</h1>
            <p className="text-text-secondary">Convert between HEX, RGB, HSL, CMYK</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="flex gap-4">
            <div
              className="w-32 h-32 rounded-lg border-4 border-border-color flex-shrink-0"
              style={{ backgroundColor: result.valid ? result.hex : '#1a1a24' }}
            />
            <div className="flex-1 space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Input (any format)</label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => { setInput(e.target.value); setColor(e.target.value); }}
                  placeholder="#ff0000, rgb(255,0,0), hsl(0,100%,50%)"
                  className="input-field font-mono"
                />
              </div>
            </div>
          </div>

          {result.valid && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-text-secondary">Converted Values</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'HEX', value: result.hex },
                  { label: 'RGB', value: result.rgb },
                  { label: 'HSL', value: result.hsl },
                  { label: 'CMYK', value: result.cmyk },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary">
                    <div>
                      <span className="text-text-tertiary text-sm">{item.label}</span>
                      <p className="font-mono text-text-primary">{item.value}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(item.value, item.label)}
                      className="p-2 hover:bg-bg-secondary rounded"
                    >
                      {copied === item.label ? <Check size={16} className="text-green-500" /> : <Copy size={16} className="text-text-tertiary" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!result.valid && input && (
            <div className="p-4 rounded-lg bg-red-500/10 text-red-500 text-sm">
              Invalid color format. Try: #ff0000, rgb(255,0,0), hsl(0,100%,50%), cmyk(0%,100%,100%,0%)
            </div>
          )}
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}