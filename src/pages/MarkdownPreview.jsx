import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, Copy, Check } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function MarkdownPreview() {
  const [input, setInput] = useState('# Hello World\n\nThis is a **markdown** previewer.\n\n## Features\n\n- Live preview\n- Supports **bold** and *italic*\n- Lists and code blocks\n\n```javascript\nconsole.log("Hello!");\n```');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderMarkdown = (text) => {
    let html = text
      .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold mt-6 mb-3">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-bg-tertiary px-1.5 py-0.5 rounded text-accent-tertiary">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-bg-tertiary p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm">$2</code></pre>')
      .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 list-decimal">$2</li>')
      .replace(/\n/g, '<br>');

    html = html.replace(/(<li class="ml-4">.*<\/li>)(<br>)?/g, '<ul class="my-2">$1</ul>');

    return html;
  };

  return (
    <>
      <Helmet>
        <title>Markdown Previewer | CosmosDev</title>
        <meta name="description" content="Live markdown editor with real-time preview. Write and preview markdown online." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-primary/20">
            <FileText size={24} className="text-accent-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Markdown Preview</h1>
            <p className="text-text-secondary">Live markdown editor with preview</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-text-secondary">Markdown</label>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Write your markdown here..."
              className="tool-input h-[500px]"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Preview</label>
            <div
              className="h-[500px] overflow-y-auto p-4 rounded-lg bg-bg-tertiary border border-border-color prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(input) }}
            />
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}