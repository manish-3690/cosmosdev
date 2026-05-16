import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Github, Coffee, Mail, Tag } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-bg-secondary border-b border-border-color z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-bg-tertiary transition-colors"
          >
            <Menu size={20} />
          </button>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold text-text-primary hidden sm:block">
              Cosmos<span className="text-accent-primary">Dev</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 ml-8">
            <Link
              to="/about"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            >
              About
            </Link>
            <Link
              to="/pricing"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            >
              <Tag size={16} />
              Pricing
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
            >
              <Mail size={16} />
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border-color hover:bg-bg-tertiary transition-colors text-sm"
          >
            <Github size={16} />
            <span className="hidden sm:inline">Star</span>
          </a>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-medium text-sm hover:opacity-90 transition-opacity">
            <Coffee size={16} />
            <span className="hidden sm:inline">Buy me a coffee</span>
          </button>
        </div>
      </div>
    </header>
  );
}