import React from 'react';
import { Link } from 'react-router-dom';
import { getCategoryById } from '../data/tools';

export default function ToolCard({ tool }) {
  const category = getCategoryById(tool.category);
  const Icon = tool.icon;

  return (
    <Link
      to={tool.route}
      className="card group hover:border-accent-primary/50 hover:shadow-lg hover:shadow-accent-primary/10 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${category?.color || '#6366f1'}20` }}
        >
          <Icon size={24} style={{ color: category?.color || '#6366f1' }} />
        </div>
        {tool.pro && <span className="pro-badge">Pro</span>}
      </div>

      <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
        {tool.name}
      </h3>

      <p className="text-text-secondary text-sm line-clamp-2">
        {tool.description}
      </p>
    </Link>
  );
}