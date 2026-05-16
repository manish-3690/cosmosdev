import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ListOrdered, Copy, Check } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function WordCounter() {
  const [text, setText] = useState('');

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    lines: text.split('\n').length,
    paragraphs: text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
  };

  const copyToClipboard = () => {
    const summary = `Words: ${stats.words}
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Lines: ${stats.lines}
Paragraphs: ${stats.paragraphs}
Sentences: ${stats.sentences}`;
    navigator.clipboard.writeText(summary);
  };

  return (
    <>
      <Helmet>
        <title>Word & Character Counter | CosmosDev</title>
        <meta name="description" content="Count words, characters, lines, and more in your text." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-500/20">
            <ListOrdered size={24} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Word & Character Counter</h1>
            <p className="text-text-secondary">Count words and characters in your text</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="space-y-3">
          <label className="text-sm font-medium text-text-secondary">Your Text</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="tool-input h-64"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Words', value: stats.words },
            { label: 'Characters', value: stats.characters },
            { label: 'No Spaces', value: stats.charactersNoSpaces },
            { label: 'Lines', value: stats.lines },
            { label: 'Paragraphs', value: stats.paragraphs },
            { label: 'Sentences', value: stats.sentences },
          ].map((stat) => (
            <div key={stat.label} className="card text-center">
              <div className="text-3xl font-bold text-accent-primary mb-1">{stat.value}</div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-text-primary">Reading Time</h3>
          </div>
          <p className="text-text-secondary">
            ~{Math.ceil(stats.words / 200)} minute{stats.words >= 200 ? '' : 's'} to read
            ({stats.words} words at 200 wpm)
          </p>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}