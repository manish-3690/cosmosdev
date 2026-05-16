# DevToolbox - Developer Tools Website Specification

## 1. Project Overview

**Project Name:** DevToolbox
**Type:** Single Page Application (React + Vite)
**Core Functionality:** A collection of 25 free online developer utilities for encoding, decoding, generating, converting, and validating common developer tasks.
**Target Users:** Software developers, web designers, DevOps engineers, and technical professionals who need quick access to common utility tools.

---

## 2. UI/UX Specification

### Layout Structure

**Overall Layout:**
- Fixed left sidebar (280px width on desktop, collapsible on mobile)
- Main content area with header at top
- Full viewport height layout

**Page Sections:**
- **Header (64px height):** Logo, site name, search bar, GitHub star button, Buy me a coffee button
- **Sidebar (280px):** Tool categories with expandable sections, search filter
- **Main Content:** Tool page with optional top ad slot, tool interface, optional bottom ad slot
- **Footer:** Links, newsletter signup, copyright

**Responsive Breakpoints:**
- Mobile: < 768px (sidebar as hamburger menu)
- Tablet: 768px - 1024px (condensed sidebar)
- Desktop: > 1024px (full sidebar)

### Visual Design

**Color Palette:**
```
--bg-primary: #0a0a0f (deep dark)
--bg-secondary: #12121a (card backgrounds)
--bg-tertiary: #1a1a24 (elevated elements)
--accent-primary: #6366f1 (indigo)
--accent-secondary: #8b5cf6 (purple)
--accent-tertiary: #06b6d4 (cyan)
--text-primary: #f1f5f9 (white-ish)
--text-secondary: #94a3b8 (muted gray)
--text-tertiary: #64748b (very muted)
--border-color: #2d2d3a
--success: #22c55e
--error: #ef4444
--warning: #f59e0b
```

**Typography:**
- Font Family: "Inter", system-ui, -apple-system, sans-serif
- Headings:
  - H1: 32px, font-weight 700
  - H2: 24px, font-weight 600
  - H3: 18px, font-weight 600
- Body: 14px, font-weight 400
- Code/Mono: "JetBrains Mono", "Fira Code", monospace, 13px

**Spacing System:**
- Base unit: 4px
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64px
- Card padding: 24px
- Section gaps: 24px

**Visual Effects:**
- Border radius: 8px (cards), 6px (buttons), 4px (inputs)
- Box shadows: 0 4px 6px -1px rgba(0, 0, 0, 0.3)
- Transitions: 150ms ease-in-out for interactions
- Subtle gradient on header: linear-gradient(135deg, #6366f1, #8b5cf6)
- Glow effects on focus states

### Components

**Header:**
- Logo with icon (wrench/gear icon)
- Site name "DevToolbox"
- Search input (expandable on mobile)
- GitHub star button with count placeholder
- "Buy me a coffee" button with coffee icon
- Mobile hamburger menu

**Sidebar:**
- Tool categories as collapsible sections
- Category icons
- Tool items with icons and names
- Active state highlighting
- Category badge counts

**Tool Cards (Homepage):**
- Icon (from category)
- Tool name
- Tool description (short)
- "Pro" badge for 5 premium tools
- Hover: slight scale + glow

**Tool Pages:**
- Tool title with icon
- Description text
- Top ad slot placeholder (728x90 or 320x100)
- Tool interface area
- Bottom ad slot placeholder
- Copy button for outputs

**Buttons:**
- Primary: gradient background (indigo to purple)
- Secondary: outlined with border
- Ghost: no background, text only
- States: hover (lighter), active (darker), disabled (50% opacity)

**Inputs:**
- Dark background (#1a1a24)
- Border: 1px solid #2d2d3a
- Focus: border-color changes to accent
- Textarea: resizable, monospace font

**Badges:**
- "Pro" badge: gold/yellow gradient, small
- Category badges: pill shape, muted colors

---

## 3. Functionality Specification

### Core Features

**Navigation:**
- React Router for routing
- Routes: `/` (home), `/tools/:toolId` (individual tools)
- 404 page for unknown routes

**Search:**
- Filter tools by name
- Real-time filtering as user types
- Search in sidebar and homepage

**Tool Categories:**
1. Text & Encoding (6 tools)
2. Generator Tools (6 tools)
3. Converter Tools (6 tools)
4. Checker & Validator (5 tools)
5. Utility Tools (2 tools)

### Tool Implementations

**1. JSON Formatter & Validator**
- Input: JSON text area
- Output: Formatted/pretty JSON
- Features: Syntax validation, error highlighting, minify option, copy button

**2. Base64 Encoder/Decoder**
- Input: Text or Base64 string
- Mode toggle: Encode/Decode
- Output: Result with copy button

**3. URL Encoder/Decoder**
- Input: URL or encoded string
- Mode toggle: Encode/Decode
- Output: Result with copy button

**4. HTML Entity Encoder/Decoder**
- Input: HTML or encoded string
- Mode toggle: Encode/Decode
- Features: Handle all HTML entities

**5. JWT Decoder**
- Input: JWT token
- Output: Header (JSON), Payload (JSON), Signature display
- Features: Expiration check, copy buttons

**6. Markdown Previewer**
- Input: Markdown editor (left)
- Output: Live preview (right)
- Features: Split view, bold/italic/headers/lists/code support

**7. Password Generator**
- Options: Length (8-128), uppercase, lowercase, numbers, symbols
- Output: Generated password
- Features: Copy button, regenerate button

**8. UUID / ULID Generator**
- Options: Type (UUID v4, ULID), quantity (1-100)
- Output: List of generated IDs
- Features: Copy all, copy individual

**9. Lorem Ipsum Generator**
- Options: Type (words/sentences/paragraphs), count
- Output: Generated text
- Features: Copy button

**10. Hash Generator**
- Input: Text input
- Options: Algorithm (MD5, SHA1, SHA256, SHA512)
- Output: Hash in hex format
- Features: Copy button, uppercase toggle

**11. Color Picker & HEX/RGB/HSL Converter**
- Input: Color picker or hex input
- Output: HEX, RGB, HSL values
- Features: Copy each format, visual preview

**12. CRON Expression Builder**
- Input: Visual selectors for each field
- Output: CRON expression + human readable
- Features: Copy expression, explain each field

**13. Unix Timestamp Converter**
- Input: Timestamp or date picker
- Mode: To timestamp / From timestamp
- Output: Both formats
- Features: Current time button, copy buttons

**14. Number Base Converter**
- Input: Number in any base
- Options: From base, To base (2,8,10,16)
- Output: Converted number
- Features: Copy button

**15. CSS Unit Converter**
- Input: Value + unit
- Options: Target units (px, rem, em, vh, vw)
- Output: Converted values for all units
- Features: Base font size setting (default 16px)

**16. Color Format Converter**
- Input: Any color format (HEX/RGB/HSL/CMYK)
- Output: All formats
- Features: Copy each, visual preview

**17. JSON to CSV Converter**
- Input: JSON (array of objects)
- Output: CSV
- Features: Auto-detect keys, download button

**18. JSON to XML Converter**
- Input: JSON
- Output: XML
- Features: Pretty print, download button

**19. Regex Tester**
- Input: Regex pattern, test string
- Output: Highlighted matches, match groups
- Flags: g, i, m toggles
- Features: Match count, error display

**20. Code Diff Checker**
- Input: Two text areas (original, modified)
- Output: Side-by-side diff with highlights
- Features: Added (green), removed (red), line numbers

**21. Word & Character Counter**
- Input: Text area
- Output: Word count, character count (with/without spaces), line count
- Features: Real-time update

**22. IP Address Lookup**
- Input: IP address
- Output: Location data (country, city, ISP) using free API
- Features: Loading state, error handling

**23. SSL Certificate Checker**
- Input: Domain name
- Output: Certificate details (issuer, valid from, valid to, days remaining)
- Features: Loading state, error handling

**24. QR Code Generator**
- Input: Text/URL
- Output: QR code image
- Features: Download as PNG, size options

**25. Responsive Breakpoint Tester**
- Preset widths: 320px, 375px, 768px, 1024px, 1440px
- Output: Iframe-like container at selected width
- Features: Click to toggle presets

### Pro Tools (5 tools - future premium features)
- SSL Certificate Checker
- IP Address Lookup
- JSON to CSV Converter
- JSON to XML Converter
- Code Diff Checker

---

## 4. Technical Requirements

**Framework & Build:**
- Vite + React 18
- React Router v6
- Tailwind CSS v3
- Lucide React (icons)

**Dependencies:**
- react, react-dom
- react-router-dom
- lucide-react
- qrcode.react
- tailwindcss

**SEO:**
- React Helmet (from react-helmet-async)
- Unique title/description per page
- Open Graph tags

**File Structure:**
```
/src
  /components
    Layout.jsx
    Sidebar.jsx
    ToolCard.jsx
    Header.jsx
    Footer.jsx
    AdSlot.jsx
  /pages
    Home.jsx
    JsonFormatter.jsx
    Base64.jsx
    UrlEncoder.jsx
    HtmlEntity.jsx
    JwtDecoder.jsx
    MarkdownPreview.jsx
    PasswordGenerator.jsx
    UuidGenerator.jsx
    LoremIpsum.jsx
    HashGenerator.jsx
    ColorPicker.jsx
    CronBuilder.jsx
    TimestampConverter.jsx
    NumberBase.jsx
    CssUnitConverter.jsx
    ColorFormat.jsx
    JsonToCsv.jsx
    JsonToXml.jsx
    RegexTester.jsx
    DiffChecker.jsx
    WordCounter.jsx
    IpLookup.jsx
    SslChecker.jsx
    QrCode.jsx
    ResponsiveTester.jsx
    NotFound.jsx
  /data
    tools.js
  /hooks
    useSearch.js
  App.jsx
  main.jsx
  index.css
vercel.json
tailwind.config.js
package.json
```

---

## 5. Acceptance Criteria

### Visual Checkpoints
- [ ] Dark theme applied consistently
- [ ] Sidebar shows all 25 tools in 5 categories
- [ ] Homepage displays tool cards in grid
- [ ] Each tool page loads correctly
- [ ] Mobile responsive works
- [ ] Pro badges visible on 5 tools

### Functional Checkpoints
- [ ] All 25 tools work 100% client-side
- [ ] Navigation between tools works
- [ ] Search filtering works
- [ ] Copy buttons work
- [ ] QR code generates correctly
- [ ] IP lookup uses API
- [ ] SSL checker uses API
- [ ] All other tools compute locally

### SEO Checkpoints
- [ ] React Helmet used on all pages
- [ ] Unique title per page
- [ ] Unique description per page

### Monetization Checkpoints
- [ ] Ad slot divs on each tool page (top and bottom)
- [ ] "Buy me a coffee" button in header
- [ ] Newsletter signup in footer

---

## 6. Deployment

**Vercel Configuration:**
- vercel.json for SPA routing
- Build command: npm run build
- Output directory: dist

**Instructions:**
1. Run locally: npm install && npm run dev
2. Deploy: Push to GitHub, connect to Vercel
3. AdSense: Apply after domain setup