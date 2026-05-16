import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hash, Copy, Check } from 'lucide-react';
import AdSlot from '../components/AdSlot';

async function sha1(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sha512(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function md5(text) {
  const rotateLeft = (val, num) => (val << num) | (val >>> (32 - num));
  const safeAdd = (a, b) => {
    const lsw = (a & 0xffff) + (b & 0xffff);
    const msw = (a >> 16) + (b >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  };
  const safeMultiply = (a, b) => {
    const am = Math.imul(a, 32768) * 2;
    const bm = Math.imul(b, 32768) * 2;
    return Math.imul(am >> 16, 32768) + am + Math.imul(bm >> 16, 32768) + bm;
  };

  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
  ];

  const K = [];
  for (let i = 0; i < 64; i++) {
    K[i] = Math.abs(Math.sin(i + 1)) * 0x100000000 >>> 0;
  }

  const msg = [];
  const msgLen = text.length * 8;

  for (let i = 0; i < msg.length * 64; i++) {
    msg[i] = 0;
  }
  for (let i = 0; i < text.length; i++) {
    msg[i >> 2] |= text.charCodeAt(i) << ((i % 4) * 8);
  }
  msg[msg.length] = 0x80;

  for (let i = msg.length + 14; i % 64 !== 0; i++) {
    msg[i] = 0;
  }
  msg[msg.length - 14] = msgLen & 0xffffffff;
  msg[msg.length - 13] = Math.floor(msgLen / 0x100000000);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  for (let i = 0; i < msg.length; i += 64) {
    let A = a0, B = b0, C = c0, D = d0;

    for (let j = 0; j < 64; j++) {
      let F, g;

      if (j < 16) {
        F = (B & C) | ((~B) & D);
        g = j;
      } else if (j < 32) {
        F = (D & B) | ((~D) & C);
        g = (5 * j + 1) % 16;
      } else if (j < 48) {
        F = B ^ C ^ D;
        g = (3 * j + 5) % 16;
      } else {
        F = C ^ (B | (~D));
        g = (7 * j) % 16;
      }

      F = F >>> 0;
      const temp = (A + F + K[j] + (msg[i + g] || 0)) >>> 0;
      A = D;
      D = C;
      C = B;
      B = (B + rotateLeft(temp, S[j])) >>> 0;
    }

    a0 = (a0 + A) >>> 0;
    b0 = (b0 + B) >>> 0;
    c0 = (c0 + C) >>> 0;
    d0 = (d0 + D) >>> 0;
  }

  const toHex = (n) => {
    let hex = '';
    for (let i = 0; i < 4; i++) {
      hex += ((n >> (i * 8)) & 255).toString(16).padStart(2, '0');
    }
    return hex;
  };

  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
}

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA256');
  const [output, setOutput] = useState('');
  const [uppercase, setUppercase] = useState(false);

  const generate = async () => {
    if (!input) {
      setOutput('');
      return;
    }
    try {
      let hash;
      switch (algorithm) {
        case 'MD5':
          hash = md5(input);
          break;
        case 'SHA1':
          hash = await sha1(input);
          break;
        case 'SHA256':
          hash = await sha256(input);
          break;
        case 'SHA512':
          hash = await sha512(input);
          break;
        default:
          hash = await sha256(input);
      }
      setOutput(uppercase ? hash.toUpperCase() : hash);
    } catch (e) {
      setOutput('Error generating hash');
    }
  };

  useEffect(() => {
    if (input) generate();
  }, [algorithm, uppercase]);

  return (
    <>
      <Helmet>
        <title>Hash Generator | CosmosDev</title>
        <meta name="description" content="Generate MD5, SHA1, SHA256, and SHA512 hashes from text." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-secondary/20">
            <Hash size={24} className="text-accent-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Hash Generator</h1>
            <p className="text-text-secondary">Generate MD5, SHA1, SHA256, SHA512 hashes</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Algorithm</label>
            <div className="grid grid-cols-4 gap-2">
              {['MD5', 'SHA1', 'SHA256', 'SHA512'].map((algo) => (
                <button
                  key={algo}
                  onClick={() => setAlgorithm(algo)}
                  className={`py-2 rounded-lg font-medium transition-colors text-sm ${algorithm === algo ? 'bg-accent-primary text-white' : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'}`}
                >
                  {algo}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Input Text</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash..."
              className="tool-input h-32"
            />
          </div>

          <button onClick={generate} className="btn-primary w-full">
            Generate Hash
          </button>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">Hash Output</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                    className="w-4 h-4 rounded accent-accent-primary"
                  />
                  Uppercase
                </label>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-bg-tertiary border border-border-color">
              <code className="text-sm text-text-primary break-all font-mono">{output || 'Hash will appear here...'}</code>
            </div>
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}