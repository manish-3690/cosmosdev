import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-color py-8 mt-auto">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-lg font-bold text-text-primary">CosmosDev</span>
            </Link>
            <p className="text-text-secondary text-sm">
              Free online tools for developers. Convert, encode, generate, and validate with ease.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/privacy" className="hover:text-accent-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-accent-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-accent-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Newsletter</h3>
            <p className="text-text-secondary text-sm mb-3">
              Get updates about new tools and features.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-md bg-bg-tertiary border border-border-color text-sm focus:outline-none focus:border-accent-primary"
              />
              <button className="btn-primary text-sm px-4">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-border-color">
          <p className="text-text-tertiary text-sm">
            &copy; {new Date().getFullYear()} CosmosDev. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-text-primary transition-colors">
              <Github size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-text-tertiary hover:text-text-primary transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}