import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, Send, Check, Github, Twitter, Linkedin, Bug, ExternalLink } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Formspree will handle the form submission
    // Replace ACTION_URL with your Formspree endpoint
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Contact | CosmosDev</title>
        <meta name="description" content="Contact DevToolbox. Have questions or found a bug? We'd love to hear from you." />
      </Helmet>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-tertiary/20">
            <Mail size={24} className="text-accent-tertiary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Contact Us</h1>
            <p className="text-text-secondary">Have a question or feedback?</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card space-y-6">
            <h2 className="text-xl font-semibold text-text-primary">Send us a Message</h2>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Message Sent!</h3>
                <p className="text-text-secondary">Thank you for reaching out. We'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="input-field"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="input-field"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    className="tool-input h-40"
                  />
                </div>

                <button type="submit" className="btn-primary flex items-center gap-2 w-full justify-center">
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-border-color space-y-2">
              <p className="text-text-tertiary text-sm">
                For quick responses, you can also email us directly at{' '}
                <span className="text-accent-primary">cosmosdev0@gmail.com</span>
              </p>
              <p className="text-text-tertiary text-sm">
                Typical response time: 24-48 hours
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card space-y-4">
              <div className="flex items-center gap-2">
                <Bug size={20} className="text-red-500" />
                <h2 className="text-xl font-semibold text-text-primary">Found a Bug?</h2>
              </div>
              <p className="text-text-secondary">
                If you encounter any issues, bugs, or unexpected behavior with our tools, please let us know so we can fix it!
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2 justify-center"
              >
                <ExternalLink size={16} />
                Report on GitHub
              </a>
            </div>

            <div className="card space-y-4">
              <h2 className="text-xl font-semibold text-text-primary">Connect With Us</h2>
              <p className="text-text-secondary">
                Follow us on social media for updates, new tool announcements, and developer resources.
              </p>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-bg-tertiary hover:bg-border-color transition-colors"
                >
                  <Twitter size={24} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">Twitter</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-bg-tertiary hover:bg-border-color transition-colors"
                >
                  <Github size={24} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">GitHub</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-lg bg-bg-tertiary hover:bg-border-color transition-colors"
                >
                  <Linkedin size={24} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="card bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare size={20} className="text-accent-primary" />
                <h3 className="font-semibold text-text-primary">Quick Feedback</h3>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                Have an idea for a new tool? Want to see improvements to existing tools? We'd love to hear your suggestions!
              </p>
              <p className="text-text-tertiary text-sm">
                Every piece of feedback helps us make DevToolbox better for the developer community.
              </p>
            </div>
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}