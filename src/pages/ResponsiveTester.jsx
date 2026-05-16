import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Monitor, Smartphone, Tablet, Laptop } from 'lucide-react';
import AdSlot from '../components/AdSlot';

const presets = [
  { name: 'Mobile S', icon: Smartphone, width: 320 },
  { name: 'Mobile L', icon: Smartphone, width: 375 },
  { name: 'Tablet', icon: Tablet, width: 768 },
  { name: 'Laptop', icon: Laptop, width: 1024 },
  { name: 'Desktop', icon: Monitor, width: 1440 },
];

export default function ResponsiveTester() {
  const [width, setWidth] = useState(375);
  const [url, setUrl] = useState('');

  return (
    <>
      <Helmet>
        <title>Responsive Breakpoint Tester | CosmosDev</title>
        <meta name="description" content="Test your website at different screen sizes. Preview at mobile, tablet, and desktop widths." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-primary/20">
            <Monitor size={24} className="text-accent-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Responsive Tester</h1>
            <p className="text-text-secondary">Test at different screen sizes</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Website URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="input-field"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">Width</label>
              <span className="text-accent-primary font-medium">{width}px</span>
            </div>
            <input
              type="range"
              min="320"
              max="1920"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
              className="w-full accent-accent-primary"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Quick Presets</label>
            <div className="grid grid-cols-5 gap-2">
              {presets.map((preset) => {
                const Icon = preset.icon;
                return (
                  <button
                    key={preset.name}
                    onClick={() => setWidth(preset.width)}
                    className={`p-3 rounded-lg flex flex-col items-center gap-2 transition-colors ${
                      width === preset.width
                        ? 'bg-accent-primary text-white'
                        : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="text-xs">{preset.name}</span>
                    <span className="text-xs opacity-70">{preset.width}px</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium text-text-secondary">Preview</label>
          <div className="bg-bg-secondary rounded-lg border border-border-color p-4 overflow-x-auto">
            <div className="bg-bg-tertiary rounded-lg inline-block" style={{ width: width }}>
              {url ? (
                <iframe
                  src={url}
                  title="Preview"
                  className="w-full rounded-lg"
                  style={{ height: '500px', border: 'none' }}
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div className="h-[500px] flex items-center justify-center text-text-tertiary">
                  Enter a URL above to preview
                </div>
              )}
            </div>
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}