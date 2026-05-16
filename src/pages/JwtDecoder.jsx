import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Key, Copy, Check, AlertCircle, CheckCircle } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function JwtDecoder() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState(null);
  const [payload, setPayload] = useState(null);
  const [signature, setSignature] = useState('');
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState({});

  const decode = () => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const decodeBase64 = (str) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
        return decodeURIComponent(atob(padded).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      };

      setHeader(JSON.parse(decodeBase64(parts[0])));
      setPayload(JSON.parse(decodeBase64(parts[1])));
      setSignature(parts[2]);
      setError(null);
    } catch (e) {
      setError(e.message);
      setHeader(null);
      setPayload(null);
      setSignature('');
    }
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [key]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [key]: false })), 2000);
  };

  const isExpired = payload && payload.exp && Date.now() > payload.exp * 1000;

  return (
    <>
      <Helmet>
        <title>JWT Decoder | CosmosDev</title>
        <meta name="description" content="Decode and inspect JWT tokens online. View header, payload, and signature." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-primary/20">
            <Key size={24} className="text-accent-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">JWT Decoder</h1>
            <p className="text-text-secondary">Decode and inspect JWT tokens</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="space-y-3">
          <label className="text-sm font-medium text-text-secondary">JWT Token</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste your JWT token here..."
            className="tool-input h-32"
          />
          <button onClick={decode} className="btn-primary">
            Decode Token
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-500/10 rounded-md">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {payload && (
          <div className="space-y-4">
            {isExpired && (
              <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-500/10 rounded-md">
                <AlertCircle size={16} />
                Token has expired
              </div>
            )}

            <div className="grid lg:grid-cols-3 gap-4">
              <div className="card">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-text-primary">Header</h3>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(header, null, 2), 'header')}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    {copied.header ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </div>
                <pre className="text-sm text-text-secondary font-mono overflow-x-auto">
                  {JSON.stringify(header, null, 2)}
                </pre>
              </div>

              <div className="card lg:col-span-2">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-text-primary">Payload</h3>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(payload, null, 2), 'payload')}
                    className="text-text-secondary hover:text-text-primary"
                  >
                    {copied.payload ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </div>
                <pre className="text-sm text-text-secondary font-mono overflow-x-auto">
                  {JSON.stringify(payload, null, 2)}
                </pre>
                {payload.exp && (
                  <div className="mt-3 pt-3 border-t border-border-color text-sm">
                    <span className="text-text-tertiary">Expires: </span>
                    <span className={isExpired ? 'text-red-500' : 'text-green-500'}>
                      {new Date(payload.exp * 1000).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-text-primary mb-3">Signature</h3>
              <p className="text-sm text-text-secondary font-mono break-all">{signature}</p>
            </div>
          </div>
        )}

        <AdSlot position="bottom" />
      </div>
    </>
  );
}