import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Type, Copy, Check } from 'lucide-react';
import AdSlot from '../components/AdSlot';

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

const generateLorem = (type, count) => {
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
  }

  if (type === 'words') {
    return words.join(' ');
  }

  if (type === 'sentences') {
    const sentences = [];
    const wordsPerSentence = Math.ceil(count / Math.max(1, Math.floor(count / 8)));
    for (let i = 0; i < count; i += wordsPerSentence) {
      const sentence = words.slice(i, i + wordsPerSentence).join(' ');
      sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.');
    }
    return sentences.join(' ');
  }

  if (type === 'paragraphs') {
    const paragraphs = [];
    const wordsPerParagraph = Math.ceil(count / Math.max(1, Math.floor(count / 5)));
    for (let i = 0; i < count; i += wordsPerParagraph) {
      const wordsInPara = words.slice(i, i + wordsPerParagraph).join(' ');
      paragraphs.push(wordsInPara.charAt(0).toUpperCase() + wordsInPara.slice(1) + '.');
    }
    return paragraphs.join('\n\n');
  }

  return words.join(' ');
};

export default function LoremIpsum() {
  const [type, setType] = useState('sentences');
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setOutput(generateLorem(type, count));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(() => {
    generate();
  }, []);

  return (
    <>
      <Helmet>
        <title>Lorem Ipsum Generator | CosmosDev</title>
        <meta name="description" content="Generate placeholder text. Create lorem ipsum in words, sentences, or paragraphs." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-secondary/20">
            <Type size={24} className="text-accent-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Lorem Ipsum Generator</h1>
            <p className="text-text-secondary">Generate placeholder text</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Type</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'words', label: 'Words' },
                { value: 'sentences', label: 'Sentences' },
                { value: 'paragraphs', label: 'Paragraphs' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setType(opt.value)}
                  className={`py-3 rounded-lg font-medium transition-colors ${type === opt.value ? 'bg-accent-primary text-white' : 'bg-bg-tertiary text-text-secondary hover:text-text-primary'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-text-secondary">Count</label>
              <span className="text-lg font-semibold text-accent-primary">{count}</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full accent-accent-primary"
            />
          </div>

          <button onClick={generate} className="btn-primary w-full">
            Generate
          </button>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">Output</label>
              <button
                onClick={copyToClipboard}
                disabled={!output}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary disabled:opacity-50"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              className="tool-input h-48"
            />
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}