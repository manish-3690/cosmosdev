import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { categories, tools } from '../data/tools';
import ToolCard from '../components/ToolCard';

export default function Home() {
  const [search, setSearch] = useState('');

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(search.toLowerCase()) ||
    tool.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>CosmosDev - The universe of developer tools</title>
        <meta name="description" content="The universe of developer tools. Free online tools for developers - encode, decode, generate, convert, and validate with precision." />
        <meta property="og:title" content="CosmosDev - The universe of developer tools" />
        <meta property="og:description" content="Free online developer tools. Encode, decode, generate, convert, and validate with precision." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Free Online <span className="gradient-text">Developer Tools</span>
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-8">
            A collection of useful utilities for developers. Encode, decode, convert, generate, and validate — all in one place.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-bg-secondary border border-border-color text-text-primary text-lg focus:outline-none focus:border-accent-primary transition-colors"
            />
          </div>
        </div>

        {search ? (
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        ) : (
          categories.map(category => {
            const categoryTools = tools.filter(t => t.category === category.id);
            const Icon = category.icon;

            return (
              <div key={category.id}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon size={20} style={{ color: category.color }} />
                  </div>
                  <h2 className="text-xl font-semibold text-text-primary">{category.name}</h2>
                  <span className="text-text-tertiary text-sm">({categoryTools.length})</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
}