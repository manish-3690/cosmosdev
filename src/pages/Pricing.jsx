import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, X, Star, Zap, Shield, Clock, CreditCard, RefreshCw, Gift, X as XIcon } from 'lucide-react';
import AdSlot from '../components/AdSlot';

const features = {
  free: [
    { name: 'All 25 tools', included: true },
    { name: 'AdSense ads shown', included: true },
    { name: 'No account needed', included: true },
    { name: 'Community support', included: true },
    { name: 'Future Pro tools', included: false },
    { name: 'Ad-free experience', included: false },
    { name: 'Bulk operations', included: false },
    { name: 'API access', included: false },
    { name: 'Priority support', included: false },
  ],
  pro: [
    { name: 'All 25 tools', included: true },
    { name: 'No ads', included: true },
    { name: 'Account required', included: true },
    { name: 'Priority support', included: true },
    { name: 'Future Pro tools', included: true },
    { name: 'Ad-free experience', included: true },
    { name: 'Bulk operations', included: true },
    { name: 'API access', included: true },
    { name: 'Priority support', included: true },
  ],
};

const faqs = [
  {
    question: 'Do I need an account to use DevToolbox?',
    answer: 'No! The free tier works without any account or registration. Simply visit any tool and start using it immediately.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, debit cards, and PayPal. UPI support is coming soon for our Indian users.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 7-day full refund guarantee. If you are not satisfied with Pro for any reason, contact us within 7 days of purchase for a complete refund.',
  },
  {
    question: 'Is the free tier really free?',
    answer: 'Yes! The free tier will always remain free with access to all 25 tools. We believe everyone should have access to developer tools.',
  },
  {
    question: 'When is the Pro plan launching?',
    answer: 'We are currently building Pro features. Join our waitlist to get 50% off at launch and help shape the product!',
  },
  {
    question: 'What happens to my data?',
    answer: 'Nothing is stored on our servers. All tool processing happens in your browser client-side. We do not collect or store any data.',
  },
];

function WaitlistModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    const waitlist = JSON.parse(localStorage.getItem('devtoolbox_waitlist') || '[]');
    if (waitlist.includes(email)) {
      setError('This email is already on the waitlist!');
      return;
    }

    waitlist.push(email);
    localStorage.setItem('devtoolbox_waitlist', JSON.stringify(waitlist));
    setSubmitted(true);
    setEmail('');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-bg-secondary border border-border-color rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-bg-tertiary transition-colors text-text-secondary hover:text-text-primary"
        >
          <XIcon size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Gift size={32} className="text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">You're on the list!</h3>
            <p className="text-text-secondary mb-4">
              We'll email you at <span className="text-accent-primary">{email}</span> with your 50% launch discount.
            </p>
            <button onClick={onClose} className="btn-secondary">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-accent-primary/20 flex items-center justify-center mx-auto mb-4">
                <Star size={32} className="text-accent-primary" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Join the Waitlist</h3>
              <p className="text-text-secondary">
                Get <span className="text-accent-primary font-semibold">50% off</span> at launch!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-field"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>
              <button type="submit" className="btn-primary w-full">
                Join Waitlist
              </button>
            </form>

            <p className="text-text-tertiary text-xs text-center mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function Pricing() {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Pricing | CosmosDev</title>
        <meta name="description" content="DevToolbox pricing plans. Free forever or upgrade to Pro for an ad-free experience." />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Start free, upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>

        <AdSlot position="top" />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="card border-border-color">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-text-primary mb-2">Free</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-primary">$0</span>
                <span className="text-text-secondary">/forever</span>
              </div>
              <p className="text-text-secondary text-sm mt-2">No credit card required</p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.free.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  {feature.included ? (
                    <Check size={18} className="text-green-500 flex-shrink-0" />
                  ) : (
                    <X size={18} className="text-text-tertiary flex-shrink-0" />
                  )}
                  <span className={feature.included ? 'text-text-primary' : 'text-text-tertiary'}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>

            <button className="btn-secondary w-full" disabled>
              Current Plan
            </button>
          </div>

          {/* Pro Plan */}
          <div className="card border-accent-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-accent-primary text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
              Popular
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-bold text-text-primary mb-2 flex items-center gap-2">
                Pro
                <span className="pro-badge">Pro</span>
              </h2>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-accent-primary">$7</span>
                <span className="text-text-secondary">/month</span>
              </div>
              <p className="text-text-secondary text-sm mt-2">Or $60/year (save 30%)</p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.pro.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Check size={18} className="text-green-500 flex-shrink-0" />
                  <span className="text-text-primary">{feature.name}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowWaitlist(true)}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Zap size={18} />
              Join Waitlist — 50% Off
            </button>

            <p className="text-text-tertiary text-xs text-center mt-3">
              Launch discount for early supporters
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="card max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-text-primary mb-6">Feature Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-color">
                  <th className="text-left py-3 text-text-secondary font-medium">Feature</th>
                  <th className="text-center py-3 text-text-secondary font-medium">Free</th>
                  <th className="text-center py-3 text-accent-primary font-medium">Pro</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['All 25+ tools', true, true],
                  ['No account needed', true, false],
                  ['Ad-free experience', false, true],
                  ['Bulk operations', false, true],
                  ['API access', false, true],
                  ['Priority support', false, true],
                  ['Early access to new tools', false, true],
                  ['Future Pro exclusive tools', false, true],
                ].map(([feature, free, pro], i) => (
                  <tr key={i} className="border-b border-border-color/50">
                    <td className="py-3 text-text-primary">{feature}</td>
                    <td className="py-3 text-center">
                      {free ? (
                        <Check size={18} className="text-green-500 mx-auto" />
                      ) : (
                        <X size={18} className="text-text-tertiary mx-auto" />
                      )}
                    </td>
                    <td className="py-3 text-center">
                      {pro ? (
                        <Check size={18} className="text-green-500 mx-auto" />
                      ) : (
                        <X size={18} className="text-text-tertiary mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="card max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-border-color rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-bg-tertiary transition-colors"
                >
                  <span className="font-medium text-text-primary">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-text-secondary transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 pb-4 text-text-secondary">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 py-8">
          <div className="flex items-center gap-2 text-text-secondary">
            <Shield size={18} className="text-green-500" />
            <span className="text-sm">7-day refund guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <CreditCard size={18} className="text-accent-primary" />
            <span className="text-sm">Secure payment</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <Clock size={18} className="text-accent-tertiary" />
            <span className="text-sm">Cancel anytime</span>
          </div>
          <div className="flex items-center gap-2 text-text-secondary">
            <RefreshCw size={18} className="text-accent-secondary" />
            <span className="text-sm">Free forever tier</span>
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>

      <WaitlistModal isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </>
  );
}

function ChevronDown({ size, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}