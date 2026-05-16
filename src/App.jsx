import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

import JsonFormatter from './pages/JsonFormatter';
import Base64 from './pages/Base64';
import UrlEncoder from './pages/UrlEncoder';
import HtmlEntity from './pages/HtmlEntity';
import JwtDecoder from './pages/JwtDecoder';
import MarkdownPreview from './pages/MarkdownPreview';
import PasswordGenerator from './pages/PasswordGenerator';
import UuidGenerator from './pages/UuidGenerator';
import LoremIpsum from './pages/LoremIpsum';
import HashGenerator from './pages/HashGenerator';
import ColorPicker from './pages/ColorPicker';
import CronBuilder from './pages/CronBuilder';
import TimestampConverter from './pages/TimestampConverter';
import NumberBase from './pages/NumberBase';
import CssUnitConverter from './pages/CssUnitConverter';
import ColorFormat from './pages/ColorFormat';
import JsonToCsv from './pages/JsonToCsv';
import JsonToXml from './pages/JsonToXml';
import RegexTester from './pages/RegexTester';
import DiffChecker from './pages/DiffChecker';
import WordCounter from './pages/WordCounter';
import IpLookup from './pages/IpLookup';
import SslChecker from './pages/SslChecker';
import QrCodeGenerator from './pages/QrCode';
import ResponsiveTester from './pages/ResponsiveTester';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';

import WaitlistModal from './components/WaitlistModal';
import { useWaitlist } from './components/WaitlistContext';

function AppContent() {
  const { isOpen, closeWaitlist } = useWaitlist();

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools/json-formatter" element={<JsonFormatter />} />
          <Route path="tools/base64" element={<Base64 />} />
          <Route path="tools/url-encoder" element={<UrlEncoder />} />
          <Route path="tools/html-entity" element={<HtmlEntity />} />
          <Route path="tools/jwt-decoder" element={<JwtDecoder />} />
          <Route path="tools/markdown-previewer" element={<MarkdownPreview />} />
          <Route path="tools/password-generator" element={<PasswordGenerator />} />
          <Route path="tools/uuid-generator" element={<UuidGenerator />} />
          <Route path="tools/lorem-ipsum" element={<LoremIpsum />} />
          <Route path="tools/hash-generator" element={<HashGenerator />} />
          <Route path="tools/color-picker" element={<ColorPicker />} />
          <Route path="tools/cron-builder" element={<CronBuilder />} />
          <Route path="tools/timestamp-converter" element={<TimestampConverter />} />
          <Route path="tools/number-base" element={<NumberBase />} />
          <Route path="tools/css-unit" element={<CssUnitConverter />} />
          <Route path="tools/color-format" element={<ColorFormat />} />
          <Route path="tools/json-to-csv" element={<JsonToCsv />} />
          <Route path="tools/json-to-xml" element={<JsonToXml />} />
          <Route path="tools/regex-tester" element={<RegexTester />} />
          <Route path="tools/diff-checker" element={<DiffChecker />} />
          <Route path="tools/word-counter" element={<WordCounter />} />
          <Route path="tools/ip-lookup" element={<IpLookup />} />
          <Route path="tools/ssl-checker" element={<SslChecker />} />
          <Route path="tools/qr-code" element={<QrCodeGenerator />} />
          <Route path="tools/responsive-tester" element={<ResponsiveTester />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
          <Route path="contact" element={<Contact />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <WaitlistModal isOpen={isOpen} onClose={closeWaitlist} />
    </>
  );
}

export default function App() {
  return <AppContent />;
}