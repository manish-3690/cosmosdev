import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, Copy, Check } from 'lucide-react';
import AdSlot from '../components/AdSlot';

const fields = [
  { name: 'Minute', min: 0, max: 59, default: '*' },
  { name: 'Hour', min: 0, max: 23, default: '*' },
  { name: 'Day (Month)', min: 1, max: 31, default: '*' },
  { name: 'Month', min: 1, max: 12, default: '*' },
  { name: 'Day (Week)', min: 0, max: 6, default: '*' },
];

const getDescription = (cron) => {
  const parts = cron.split(' ');
  if (parts.length !== 5) return 'Invalid CRON expression';

  const [minute, hour, dayMonth, month, dayWeek] = parts;
  const descriptions = [];

  if (minute === '*' && hour === '*') {
    descriptions.push('Every minute');
  } else if (minute === '*') {
    descriptions.push(`Every minute during hour ${hour}`);
  } else if (minute.includes('/')) {
    const interval = minute.split('/')[1];
    descriptions.push(`Every ${interval} minutes`);
  } else {
    descriptions.push(`At minute ${minute}`);
  }

  if (hour !== '*') {
    if (hour.includes('/')) {
      const interval = hour.split('/')[1];
      descriptions.push(`Every ${interval} hours`);
    } else {
      descriptions.push(`At ${hour}:00`);
    }
  }

  if (dayMonth !== '*') {
    descriptions.push(`on day ${dayMonth} of the month`);
  }

  if (month !== '*') {
    const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    descriptions.push(`in ${monthNames[parseInt(month)] || month}`);
  }

  if (dayWeek !== '*') {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    descriptions.push(`on ${dayNames[parseInt(dayWeek)] || dayWeek}`);
  }

  return descriptions.join(' ') || 'Every minute';
};

export default function CronBuilder() {
  const [values, setValues] = useState({
    minute: '*',
    hour: '*',
    dayMonth: '*',
    month: '*',
    dayWeek: '*',
  });
  const [copied, setCopied] = useState(false);

  const cron = `${values.minute} ${values.hour} ${values.dayMonth} ${values.month} ${values.dayWeek}`;
  const description = getDescription(cron);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cron);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const commonPresets = [
    { name: 'Every minute', cron: '* * * * *' },
    { name: 'Every hour', cron: '0 * * * *' },
    { name: 'Every day at midnight', cron: '0 0 * * *' },
    { name: 'Every Monday', cron: '0 0 * * 1' },
    { name: 'Every month', cron: '0 0 1 * *' },
  ];

  return (
    <>
      <Helmet>
        <title>CRON Expression Builder | CosmosDev</title>
        <meta name="description" content="Build CRON expressions visually. Get human-readable explanations for your schedules." />
      </Helmet>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent-primary/20">
            <Clock size={24} className="text-accent-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">CRON Expression Builder</h1>
            <p className="text-text-secondary">Build CRON expressions visually</p>
          </div>
        </div>

        <AdSlot position="top" />

        <div className="card space-y-6">
          <div className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-text-secondary">{field.name}</label>
                  <span className="text-sm text-text-tertiary">({field.min}-{field.max})</span>
                </div>
                <input
                  type="text"
                  value={values[field.name.toLowerCase().replace(' (month)', 'month').replace(' (week)', 'week').replace(' ', '')]}
                  onChange={(e) => setValues(prev => ({ ...prev, [field.name.toLowerCase().replace(' (month)', 'month').replace(' (week)', 'week').replace(' ', '')]: e.target.value }))}
                  className="input-field font-mono"
                />
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg bg-bg-tertiary border border-border-color">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-text-secondary">Expression</span>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <code className="text-2xl font-mono text-accent-primary">{cron}</code>
            <p className="mt-3 text-text-secondary">{description}</p>
          </div>
        </div>

        <div className="card">
          <h3 className="font-semibold text-text-primary mb-4">Common Presets</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {commonPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => {
                  const parts = preset.cron.split(' ');
                  setValues({
                    minute: parts[0],
                    hour: parts[1],
                    dayMonth: parts[2],
                    month: parts[3],
                    dayWeek: parts[4],
                  });
                }}
                className="p-3 rounded-lg bg-bg-tertiary text-sm text-text-secondary hover:bg-border-color hover:text-text-primary transition-colors text-left"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        <AdSlot position="bottom" />
      </div>
    </>
  );
}