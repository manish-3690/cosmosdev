import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, X } from 'lucide-react';
import { categories, getToolsByCategory } from '../data/tools';

export default function Sidebar({ isOpen, onClose }) {
  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState(
    categories.map(c => c.id)
  );

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    tools: getToolsByCategory(category.id).filter(tool =>
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(category => category.tools.length > 0);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed lg:static top-16 left-0 bottom-0 w-72 bg-bg-secondary border-r border-border-color
        transform transition-transform duration-200 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-4">
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-md bg-bg-tertiary border border-border-color text-sm focus:outline-none focus:border-accent-primary"
            />
            <button
              onClick={onClose}
              className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 p-1"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="space-y-2">
            {filteredCategories.map(category => {
              const Icon = category.icon;
              const isExpanded = expandedCategories.includes(category.id);

              return (
                <div key={category.id}>
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-bg-tertiary transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="p-1.5 rounded-md"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon size={14} style={{ color: category.color }} />
                      </div>
                      <span className="text-sm font-medium text-text-primary">
                        {category.name}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown size={14} className="text-text-tertiary" />
                    ) : (
                      <ChevronRight size={14} className="text-text-tertiary" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="ml-4 mt-1 space-y-1">
                      {category.tools.map(tool => {
                        const ToolIcon = tool.icon;
                        return (
                          <NavLink
                            key={tool.id}
                            to={tool.route}
                            onClick={onClose}
                            className={({ isActive }) => `
                              flex items-center justify-between px-3 py-2 rounded-md text-sm
                              transition-colors
                              ${isActive
                                ? 'bg-accent-primary/20 text-accent-primary'
                                : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
                              }
                            `}
                          >
                            <div className="flex items-center gap-2">
                              <ToolIcon size={14} />
                              <span>{tool.name}</span>
                            </div>
                            {tool.pro && (
                              <span className="pro-badge">Pro</span>
                            )}
                          </NavLink>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}