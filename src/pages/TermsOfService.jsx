import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FileText, AlertTriangle, Zap, Shield } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | CosmosDev</title>
        <meta name="description" content="CosmosDev terms of service. Learn the rules for using our free tools." />
      </Helmet>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-secondary/20">
            <FileText size={24} className="text-accent-secondary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Terms of Service</h1>
            <p className="text-text-secondary">Please read these terms carefully</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <p className="text-text-tertiary text-sm">
            Last updated: May 15, 2026
          </p>

          <div className="p-4 rounded-lg bg-accent-primary/10 border border-accent-primary/20">
            <p className="text-text-secondary leading-relaxed">
              By accessing and using CosmosDev, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our Service.
            </p>
          </div>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-accent-primary" />
              <h2 className="text-xl font-semibold text-text-primary">1. Free Use</h2>
            </div>
            <p className="text-text-secondary leading-relaxed ml-8">
              CosmosDev is provided free of charge to all users. There is no paid tier, no subscription, and no payment required to use any of our tools. You may use our Service for personal, educational, or commercial purposes without any fees.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle size={20} className="text-yellow-500" />
              <h2 className="text-xl font-semibold text-text-primary">2. No Warranty</h2>
            </div>
            <p className="text-text-secondary leading-relaxed ml-8">
              CosmosDev is provided "as is" without warranty of any kind, express or implied. We do not guarantee that our tools will always work correctly or be available 100% of the time. We are not responsible for any errors, inaccuracies, or interruptions in service.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield size={20} className="text-green-500" />
              <h2 className="text-xl font-semibold text-text-primary">3. Tools Provided As-Is</h2>
            </div>
            <p className="text-text-secondary leading-relaxed ml-8">
              All developer tools on CosmosDev are provided for convenience purposes only. We do not warrant that any tool will produce correct results for your specific use case. You are responsible for verifying any output before using it in production environments.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle size={20} className="text-yellow-500" />
              <h2 className="text-xl font-semibold text-text-primary">4. No Liability for Data Loss</h2>
            </div>
            <p className="text-text-secondary leading-relaxed ml-8">
              Under no circumstances shall CosmosDev be liable for any loss or damage of data that may occur while using our tools. This includes, but is not limited to: loss of code, loss of documents, loss of generated passwords, or any other data processed through our Service. You are solely responsible for backing up your important data.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle size={20} className="text-yellow-500" />
              <h2 className="text-xl font-semibold text-text-primary">5. User Responsibility</h2>
            </div>
            <p className="text-text-secondary leading-relaxed ml-8">
              You are responsible for your own use of CosmosDev. This includes: ensuring you have the right to use any input data, complying with applicable laws and regulations, and using tools in a manner that does not violate any legal requirements.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-accent-primary" />
              <h2 className="text-xl font-semibold text-text-primary">6. Changes to Tools</h2>
            </div>
            <p className="text-text-secondary leading-relaxed ml-8">
              We reserve the right to modify, update, or discontinue any tool at any time without prior notice. This includes changing how tools work, removing features, or completely removing tools. There is no guarantee that any specific tool will remain available in the future.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-accent-primary" />
              <h2 className="text-xl font-semibold text-text-primary">7. Prohibited Uses</h2>
            </div>
            <p className="text-text-secondary leading-relaxed ml-8">
              You may not use CosmosDev to: engage in illegal activities, attempt to gain unauthorized access to systems, distribute malicious code or content, or use tools in ways that may cause harm to others. We reserve the right to block access to anyone who violates these terms.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-accent-tertiary" />
              <h2 className="text-xl font-semibold text-text-primary">8. Intellectual Property</h2>
            </div>
            <p className="text-text-secondary leading-relaxed ml-8">
              The CosmosDev website, its design, and its code are the property of CosmosDev. You may not copy, modify, or redistribute our source code. The output you generate using our tools (such as generated passwords, JSON, code snippets) is yours to use as you see fit.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-accent-tertiary" />
              <h2 className="text-xl font-semibold text-text-primary">9. Termination</h2>
            </div>
            <p className="text-text-secondary leading-relaxed ml-8">
              We may terminate or suspend your access to CosmosDev at any time, without prior notice or liability, for any reason, including if you breach these Terms of Service.
            </p>
          </section>

          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-accent-tertiary" />
              <h2 className="text-xl font-semibold text-text-primary">10. Contact</h2>
            </div>
            <p className="text-text-secondary leading-relaxed ml-8">
              If you have any questions about these Terms of Service, please contact us at <span className="text-accent-primary">cosmosdev0@gmail.com</span>
            </p>
          </section>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}