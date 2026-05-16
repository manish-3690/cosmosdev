import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, Send, Check, Github, Twitter, Linkedin, Bug, ExternalLink, Loader2 } from 'lucide-react';
import AdSlot from '../components/AdSlot';

const FORMSPREE_URL = 'https://formspree.io/f/mpqnaalq';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }

    if (!formData.email.trim() || !validateEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!formData.subject) {
      setError('Please select a subject');
      return;
    }

    if (!formData.message.trim()) {
      setError('Please enter your message');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact | CosmosDev</title>
        <meta name="description" content="Contact CosmosDev. Have questions or found a bug? We'd love to hear from you." />
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

            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Message sent!</h3>
                <p className="text-text-secondary">
                  ✅ We'll reply within 24-48 hours
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="input-field"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="input-field"
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Subject</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-field"
                    disabled={loading}
                  >
                    <option value="">Select a subject...</option>
                    <option value="Bug Report 🐛">Bug Report 🐛</option>
                    <option value="Feature Request 💡">Feature Request 💡</option>
                    <option value="General Question 💬">General Question 💬</option>
                    <option value="Partnership 🤝">Partnership 🤝</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-secondary">Message</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Your message..."
                    rows={4}
                    className="tool-input h-40"
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm p-3 bg-red-500/10 rounded-md">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center gap-2 w-full justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message 🚀
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="card space-y-4">
              <h2 className="text-xl font-semibold text-text-primary">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-accent-primary" />
                  <span className="text-text-secondary">cosmosdev0@gmail.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check size={18} className="text-green-500" />
                  <span className="text-text-secondary">Response time: 24-48 hours</span>
                </div>
              </div>
            </div>

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
                Every piece of feedback helps us make CosmosDev better for the developer community.
              </p>
            </div>
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}