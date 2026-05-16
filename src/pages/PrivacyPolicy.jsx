import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Mail, Globe } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | CosmosDev</title>
        <meta name="description" content="CosmosDev privacy policy. Learn how we handle your data." />
      </Helmet>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-primary/20">
            <Shield size={24} className="text-accent-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Privacy Policy</h1>
            <p className="text-text-secondary">Your privacy matters to us</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <p className="text-text-tertiary text-sm">
            Last updated: May 15, 2026
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-primary">1. Introduction</h2>
            <p className="text-text-secondary leading-relaxed">
              CosmosDev ("we," "our," or "us") operates the CosmosDev website located at cosmosdev.io (the "Service"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our free developer tools.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-primary">2. No Account Required</h2>
            <p className="text-text-secondary leading-relaxed">
              CosmosDev is a completely free service that does not require registration or login. You can use all our tools without creating an account or providing any personal information. We do not collect, store, or process any user data on our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-primary">3. Information We Do Not Collect</h2>
            <ul className="list-disc list-inside text-text-secondary space-y-2">
              <li>No personal identification information</li>
              <li>No email addresses or contact information</li>
              <li>No usage analytics tied to individuals</li>
              <li>No user accounts or profiles</li>
              <li>No saved preferences or history</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-primary">4. Third-Party Services</h2>

            <div className="space-y-4 mt-4">
              <div className="p-4 rounded-lg bg-bg-tertiary">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={18} className="text-accent-tertiary" />
                  <h3 className="font-medium text-text-primary">Google AdSense</h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  We display advertisements through Google AdSense. Google uses cookies to serve ads based on your visit to our site and other sites on the internet. You may opt out of Google's use of cookies by visiting the <span className="text-accent-primary">Google Advertising Settings</span> page.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-bg-tertiary">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={18} className="text-accent-tertiary" />
                  <h3 className="font-medium text-text-primary">Google Analytics</h3>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  We use Google Analytics to understand how our website is used. Google Analytics collects anonymous information such as browser type, device type, and general location. This data cannot be used to identify individual users.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-primary">5. Cookies</h2>
            <p className="text-text-secondary leading-relaxed">
              We use cookies solely for advertising purposes through Google AdSense. These cookies help deliver relevant advertisements to visitors. You can disable cookies through your browser settings, though this may affect your experience with our service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-primary">6. Data Security</h2>
            <p className="text-text-secondary leading-relaxed">
              Since we do not collect any personal data, there is no user data stored on our servers. All tool operations happen entirely in your browser (client-side), and no information is transmitted to our servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-primary">7. Children's Privacy</h2>
            <p className="text-text-secondary leading-relaxed">
              Our Service does not address anyone under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with information, please contact us.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-primary">8. Changes to This Policy</h2>
            <p className="text-text-secondary leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-text-primary">9. Contact Us</h2>
            <p className="text-text-secondary leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at <span className="text-accent-primary">cosmosdev0@gmail.com</span>
            </p>
          </section>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}