import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { QrCode, Download, Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import AdSlot from '../components/AdSlot';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState(256);
  const [copied, setCopied] = useState(false);

  const downloadQr = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    canvas.width = size * 2;
    canvas.height = size * 2;

    img.onload = () => {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const copyToClipboard = () => {
    const svg = document.getElementById('qr-code');
    const svgData = new XMLSerializer().serializeToString(svg);
    navigator.clipboard.writeText(svgData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Helmet>
        <title>QR Code Generator | CosmosDev</title>
        <meta name="description" content="Generate QR codes from text or URLs. Download as PNG or copy SVG code." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-primary/20">
            <QrCode size={24} className="text-accent-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">QR Code Generator</h1>
            <p className="text-text-secondary">Generate QR codes from text or URLs</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-text-secondary">Content</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter URL or text..."
                  className="tool-input h-32"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-text-secondary">Size</label>
                  <span className="text-accent-primary font-medium">{size}px</span>
                </div>
                <input
                  type="range"
                  min="128"
                  max="512"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full accent-accent-primary"
                />
                <div className="flex justify-between text-xs text-text-tertiary">
                  <span>128px</span>
                  <span>512px</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="p-4 rounded-lg bg-white">
                {text && (
                  <QRCodeSVG
                    id="qr-code"
                    value={text}
                    size={size}
                    level="H"
                    includeMargin={true}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={downloadQr}
                  disabled={!text}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50"
                >
                  <Download size={16} />
                  Download PNG
                </button>
                <button
                  onClick={copyToClipboard}
                  disabled={!text}
                  className="btn-secondary flex items-center gap-2 disabled:opacity-50"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? 'Copied!' : 'Copy SVG'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}