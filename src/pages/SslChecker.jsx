import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Search, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import AdSlot from '../components/AdSlot';

export default function SslChecker() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const check = async () => {
    if (!domain.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`https://ssl-api.com/?host=${encodeURIComponent(domain)}`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const sslData = data.result;
      const validFrom = new Date(sslData.valid_from * 1000);
      const validTo = new Date(sslData.valid_to * 1000);
      const daysRemaining = Math.ceil((validTo - new Date()) / (1000 * 60 * 60 * 24));

      setResult({
        domain: sslData.hostname || domain,
        issuer: sslData.issuer?.O || 'Unknown',
        validFrom: validFrom.toLocaleDateString(),
        validTo: validTo.toLocaleDateString(),
        daysRemaining,
        isValid: daysRemaining > 0,
        protocol: sslData.protocol || 'TLS',
        cipher: sslData.cipher || 'Unknown',
      });
    } catch (e) {
      setError('Unable to fetch SSL information. Please check the domain and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>SSL Certificate Checker | CosmosDev</title>
        <meta name="description" content="Check SSL certificate details for any domain. Verify validity and expiration." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-500/20">
            <ShieldCheck size={24} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">SSL Certificate Checker</h1>
            <p className="text-text-secondary">Check SSL certificate details</p>
          </div>
          <span className="pro-badge ml-auto">Pro</span>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">Domain</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="input-field flex-1"
              />
              <button
                onClick={check}
                disabled={loading || !domain.trim()}
                className="btn-primary px-6 disabled:opacity-50"
              >
                {loading ? 'Checking...' : 'Check'}
              </button>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-accent-primary border-t-transparent rounded-full" />
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm p-3 bg-red-500/10 rounded-md">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {result && (
            <div className="space-y-6">
              <div className={`flex items-center gap-3 p-4 rounded-lg ${result.isValid ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                {result.isValid ? (
                  <CheckCircle size={32} className="text-green-500" />
                ) : (
                  <XCircle size={32} className="text-red-500" />
                )}
                <div>
                  <div className={`text-lg font-semibold ${result.isValid ? 'text-green-500' : 'text-red-500'}`}>
                    {result.isValid ? 'Certificate is Valid' : 'Certificate is Invalid or Expired'}
                  </div>
                  <div className="text-text-secondary text-sm">
                    {result.daysRemaining > 0
                      ? `Expires in ${result.daysRemaining} days`
                      : `Expired ${Math.abs(result.daysRemaining)} days ago`}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-bg-tertiary">
                  <h3 className="font-semibold text-text-primary mb-3">Certificate Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Domain</span>
                      <span className="text-text-primary font-mono">{result.domain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Issuer</span>
                      <span className="text-text-primary">{result.issuer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Valid From</span>
                      <span className="text-text-primary">{result.validFrom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Valid Until</span>
                      <span className="text-text-primary">{result.validTo}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-bg-tertiary">
                  <h3 className="font-semibold text-text-primary mb-3">Connection Info</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Protocol</span>
                      <span className="text-text-primary">{result.protocol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Cipher Suite</span>
                      <span className="text-text-primary font-mono text-sm">{result.cipher}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Days Remaining</span>
                      <span className={`font-semibold ${result.daysRemaining < 30 ? 'text-red-500' : result.daysRemaining < 90 ? 'text-yellow-500' : 'text-green-500'}`}>
                        {result.daysRemaining}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}