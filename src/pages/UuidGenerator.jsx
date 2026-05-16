import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Hash, Copy, Check, Plus } from 'lucide-react';
import AdSlot from '../components/AdSlot';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const generateULID = () => {
  const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  const ENCODING_LEN = ENCODING.length;
  const TIME_LEN = 10;
  const RANDOM_LEN = 16;

  let timestamp = Date.now();
  let str = '';

  for (let i = TIME_LEN; i > 0; i--) {
    str = ENCODING[timestamp % ENCODING_LEN] + str;
    timestamp = Math.floor(timestamp / ENCODING_LEN);
  }

  for (let i = 0; i < RANDOM_LEN; i++) {
    str += ENCODING[Math.floor(Math.random() * ENCODING_LEN)];
  }

  return str;
};

export default function UuidGenerator() {
  const [type, setType] = useState('uuid');
  const [count, setCount] = useState(5);
  const [ids, setIds] = useState([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const newIds = [];
    for (let i = 0; i < count; i++) {
      newIds.push(type === 'uuid' ? generateUUID() : generateULID());
    }
    setIds(newIds);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(ids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyOne = (id) => {
    navigator.clipboard.writeText(id);
  };

  React.useEffect(() => {
    generate();
  }, []);

  return (
    <>
      <Helmet>
        <title>UUID / ULID Generator | CosmosDev</title>
        <meta name="description" content="Generate UUID v4 and ULID identifiers. Create multiple IDs at once." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-secondary/20">
            <Hash size={24} className="text-accent-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">UUID / ULID Generator</h1>
            <p className="text-text-secondary">Generate unique identifiers</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="flex gap-4">
            <button
              onClick={() => { setType('uuid'); generate(); }}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${type === 'uuid' ? 'bg-accent-primary text-white' : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'}`}
            >
              UUID v4
            </button>
            <button
              onClick={() => { setType('ulid'); generate(); }}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${type === 'ulid' ? 'bg-accent-primary text-white' : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'}`}
            >
              ULID
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-secondary">Quantity</label>
              <span className="text-lg font-semibold text-accent-primary">{count}</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full accent-accent-primary"
            />
          </div>

          <button onClick={generate} className="btn-primary flex items-center gap-2 w-full justify-center">
            <Plus size={18} />
            Generate
          </button>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">Generated IDs</label>
              <button
                onClick={copyAll}
                disabled={ids.length === 0}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary disabled:opacity-50"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {ids.map((id, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary group"
                >
                  <span className="font-mono text-sm text-text-primary">{id}</span>
                  <button
                    onClick={() => copyOne(id)}
                    className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-bg-secondary transition-all"
                  >
                    <Copy size={14} className="text-text-secondary" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}