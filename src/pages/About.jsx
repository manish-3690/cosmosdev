import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Coffee, Heart, Zap, Globe, ExternalLink } from 'lucide-react';
import AdSlot from '../components/AdSlot';

const KOFI_URL = 'https://ko-fi.com/cosmosdev';

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | CosmosDev</title>
        <meta name="description" content="Learn about CosmosDev - free online developer tools." />
      </Helmet>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-primary/20">
            <Heart size={24} className="text-accent-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">About CosmosDev</h1>
            <p className="text-text-secondary">Free tools for developers, built with love</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <h2 className="text-xl font-semibold text-text-primary">Our Mission</h2>
          <p className="text-text-secondary leading-relaxed">
            CosmosDev is a collection of free, fast, and reliable developer utilities designed to make your workflow more efficient.
            Whether you need to format JSON, generate passwords, or convert between data formats — we've got you covered.
          </p>
          <p className="text-text-secondary leading-relaxed">
            All tools run entirely in your browser — no servers, no accounts, no tracking. Your data stays on your device.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="card space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-accent-primary/20 flex items-center justify-center mx-auto">
              <Zap size={24} className="text-accent-primary" />
            </div>
            <h3 className="font-semibold text-text-primary">Fast</h3>
            <p className="text-text-secondary text-sm">All processing happens locally in your browser</p>
          </div>
          <div className="card space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <Globe size={24} className="text-green-500" />
            </div>
            <h3 className="font-semibold text-text-primary">Free Forever</h3>
            <p className="text-text-secondary text-sm">No paid features, no subscriptions, no limits</p>
          </div>
          <div className="card space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-accent-tertiary/20 flex items-center justify-center mx-auto">
              <Heart size={24} className="text-accent-tertiary" />
            </div>
            <h3 className="font-semibold text-text-primary">Open Source</h3>
            <p className="text-text-secondary text-sm">Built with transparency and community in mind</p>
          </div>
        </div>

        <div className="card bg-gradient-to-br from-[#FF5E5B]/10 to-orange-500/10 border-[#FF5E5B]/20">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-text-primary">Support Cosmos Dev ☕</h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Cosmos Dev is free forever. If it saves you time, consider buying me a coffee!
              Every bit of support helps keep these tools running and helps me add new features.
            </p>
            <a
              href={KOFI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Coffee size={18} />
              Support on Ko-fi
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}