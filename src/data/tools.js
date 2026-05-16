import {
  Braces, Lock, Link, Code, Key, FileText,
  Hash, Palette, Clock, Binary, Cpu, Database,
  CheckCircle, Globe, Shield, QrCode, Monitor,
  Wand2, Type, Search, GitCompare, FileCode,
  ListOrdered, Network, ShieldCheck, Sparkles, Award
} from 'lucide-react';

export const categories = [
  {
    id: 'text-encoding',
    name: 'Text & Encoding',
    icon: Code,
    color: '#6366f1'
  },
  {
    id: 'generators',
    name: 'Generator Tools',
    icon: Wand2,
    color: '#8b5cf6'
  },
  {
    id: 'converters',
    name: 'Converter Tools',
    icon: Cpu,
    color: '#06b6d4'
  },
  {
    id: 'validators',
    name: 'Checker & Validator',
    icon: CheckCircle,
    color: '#22c55e'
  },
  {
    id: 'utilities',
    name: 'Utility Tools',
    icon: Sparkles,
    color: '#f59e0b'
  }
];

export const tools = [
  // Text & Encoding Tools
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Pretty print and validate JSON data',
    category: 'text-encoding',
    icon: Braces,
    pro: false,
    route: '/tools/json-formatter'
  },
  {
    id: 'base64',
    name: 'Base64 Encoder',
    description: 'Encode and decode Base64 strings',
    category: 'text-encoding',
    icon: Lock,
    pro: false,
    route: '/tools/base64'
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder',
    description: 'Encode and decode URL strings',
    category: 'text-encoding',
    icon: Link,
    pro: false,
    route: '/tools/url-encoder'
  },
  {
    id: 'html-entity',
    name: 'HTML Entity Encoder',
    description: 'Encode and decode HTML entities',
    category: 'text-encoding',
    icon: Code,
    pro: false,
    route: '/tools/html-entity'
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Decode and inspect JWT tokens',
    category: 'text-encoding',
    icon: Key,
    pro: false,
    route: '/tools/jwt-decoder'
  },
  {
    id: 'markdown-previewer',
    name: 'Markdown Preview',
    description: 'Live markdown editor with preview',
    category: 'text-encoding',
    icon: FileText,
    pro: false,
    route: '/tools/markdown-previewer'
  },

  // Generator Tools
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Generate secure random passwords',
    category: 'generators',
    icon: Key,
    pro: false,
    route: '/tools/password-generator'
  },
  {
    id: 'uuid-generator',
    name: 'UUID / ULID Generator',
    description: 'Generate UUIDs and ULIDs',
    category: 'generators',
    icon: Hash,
    pro: false,
    route: '/tools/uuid-generator'
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum',
    description: 'Generate placeholder text',
    category: 'generators',
    icon: Type,
    pro: false,
    route: '/tools/lorem-ipsum'
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA1, SHA256 hashes',
    category: 'generators',
    icon: Hash,
    pro: false,
    route: '/tools/hash-generator'
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Pick colors and convert formats',
    category: 'generators',
    icon: Palette,
    pro: false,
    route: '/tools/color-picker'
  },
  {
    id: 'cron-builder',
    name: 'CRON Builder',
    description: 'Build CRON expressions visually',
    category: 'generators',
    icon: Clock,
    pro: false,
    route: '/tools/cron-builder'
  },

  // Converter Tools
  {
    id: 'timestamp-converter',
    name: 'Unix Timestamp',
    description: 'Convert timestamps to dates',
    category: 'converters',
    icon: Clock,
    pro: false,
    route: '/tools/timestamp-converter'
  },
  {
    id: 'number-base',
    name: 'Number Base',
    description: 'Convert between number bases',
    category: 'converters',
    icon: Binary,
    pro: false,
    route: '/tools/number-base'
  },
  {
    id: 'css-unit',
    name: 'CSS Unit Converter',
    description: 'Convert CSS length units',
    category: 'converters',
    icon: Cpu,
    pro: false,
    route: '/tools/css-unit'
  },
  {
    id: 'color-format',
    name: 'Color Format',
    description: 'Convert between color formats',
    category: 'converters',
    icon: Palette,
    pro: false,
    route: '/tools/color-format'
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV',
    description: 'Convert JSON to CSV format',
    category: 'converters',
    icon: Database,
    pro: true,
    route: '/tools/json-to-csv'
  },
  {
    id: 'json-to-xml',
    name: 'JSON to XML',
    description: 'Convert JSON to XML format',
    category: 'converters',
    icon: Database,
    pro: true,
    route: '/tools/json-to-xml'
  },

  // Checker & Validator
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regex patterns online',
    category: 'validators',
    icon: Search,
    pro: false,
    route: '/tools/regex-tester'
  },
  {
    id: 'diff-checker',
    name: 'Code Diff Checker',
    description: 'Compare two pieces of code',
    category: 'validators',
    icon: GitCompare,
    pro: true,
    route: '/tools/diff-checker'
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    description: 'Count words and characters',
    category: 'validators',
    icon: ListOrdered,
    pro: false,
    route: '/tools/word-counter'
  },
  {
    id: 'ip-lookup',
    name: 'IP Address Lookup',
    description: 'Look up IP location info',
    category: 'validators',
    icon: Network,
    pro: true,
    route: '/tools/ip-lookup'
  },
  {
    id: 'ssl-checker',
    name: 'SSL Checker',
    description: 'Check SSL certificate details',
    category: 'validators',
    icon: ShieldCheck,
    pro: true,
    route: '/tools/ssl-checker'
  },

  // Utility Tools
  {
    id: 'qr-code',
    name: 'QR Code Generator',
    description: 'Generate QR codes from text',
    category: 'utilities',
    icon: QrCode,
    pro: false,
    route: '/tools/qr-code'
  },
  {
    id: 'responsive-tester',
    name: 'Responsive Tester',
    description: 'Test at different screen sizes',
    category: 'utilities',
    icon: Monitor,
    pro: false,
    route: '/tools/responsive-tester'
  }
];

export const getCategoryById = (id) => categories.find(c => c.id === id);
export const getToolById = (id) => tools.find(t => t.id === id);
export const getToolsByCategory = (categoryId) => tools.filter(t => t.category === categoryId);