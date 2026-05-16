import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Network, Search, AlertCircle, MapPin, Server, Globe } from 'lucide-react';
import AdSlot from '../components/AdSlot';
import { useWaitlist } from '../components/WaitlistContext';

export default function IpLookup() {
  const { openWaitlist } = useWaitlist();
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const lookup = async () => {
    if (!ip.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.reason || 'Failed to lookup IP');
      }

      setResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>IP Address Lookup | CosmosDev</title>
        <meta name="description" content="Look up IP address location, ISP, and other information." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-500/20">
            <Network size={24} className="text-green-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">IP Address Lookup</h1>
            <p className="text-text-secondary">Look up IP location and ISP information</p>
          </div>
          <button
            onClick={openWaitlist}
            className="pro-badge ml-auto cursor-pointer hover:opacity-80 transition-opacity"
          >
            Pro
          </button>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-secondary">IP Address</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="Enter IP address..."
                className="input-field flex-1"
              />
              <button
                onClick={lookup}
                disabled={loading || !ip.trim()}
                className="btn-primary px-6 disabled:opacity-50"
              >
                {loading ? 'Looking up...' : 'Lookup'}
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
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-bg-tertiary">
                <div className="flex items-center gap-2 text-text-tertiary mb-2">
                  <Globe size={16} />
                  <span className="text-sm">Network</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">IP Address</span>
                    <span className="text-text-primary font-mono">{result.ip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Version</span>
                    <span className="text-text-primary">IPv{result.version}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">ASN</span>
                    <span className="text-text-primary font-mono">{result.asn || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-bg-tertiary">
                <div className="flex items-center gap-2 text-text-tertiary mb-2">
                  <Server size={16} />
                  <span className="text-sm">Organization</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">ISP</span>
                    <span className="text-text-primary">{result.org || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Hostname</span>
                    <span className="text-text-primary">{result.reverse || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Type</span>
                    <span className="text-text-primary">{result.type || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-bg-tertiary">
                <div className="flex items-center gap-2 text-text-tertiary mb-2">
                  <MapPin size={16} />
                  <span className="text-sm">Location</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Country</span>
                    <span className="text-text-primary">{result.country_name || 'N/A'} ({result.country_code || ''})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Region</span>
                    <span className="text-text-primary">{result.region || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">City</span>
                    <span className="text-text-primary">{result.city || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Postal Code</span>
                    <span className="text-text-primary">{result.postal || 'N/A'}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-bg-tertiary">
                <div className="flex items-center gap-2 text-text-tertiary mb-2">
                  <Search size={16} />
                  <span className="text-sm">Coordinates</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Latitude</span>
                    <span className="text-text-primary font-mono">{result.latitude || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Longitude</span>
                    <span className="text-text-primary font-mono">{result.longitude || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Timezone</span>
                    <span className="text-text-primary">{result.timezone || 'N/A'}</span>
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