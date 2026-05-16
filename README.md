# CosmosDev

Premium developer utilities for modern engineers. Encode, decode, generate, convert, and validate with precision.

## Features

- **25 Professional Tools** - JSON formatter, Base64 encoder, password generator, QR code generator, and more
- **Dark Theme** - Modern, eye-friendly dark UI
- **Mobile Responsive** - Works on all devices
- **Fast & Free** - 100% client-side, no server required
- **SEO Optimized** - Each tool has unique meta tags
- **Monetization Ready** - AdSense placeholders included

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── AdSlot.jsx        # Ad placeholder component
│   ├── Footer.jsx        # Site footer
│   ├── Header.jsx        # Site header
│   ├── Layout.jsx        # Main layout wrapper
│   ├── Sidebar.jsx       # Navigation sidebar
│   └── ToolCard.jsx      # Tool card for homepage
├── data/
│   └── tools.js          # Tool metadata
├── pages/                # 25 tool pages + Home + 404
├── App.jsx               # Main app with routing
├── index.css             # Global styles
└── main.jsx              # Entry point
```

## Deploy to Vercel (Free)

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/cosmosdev)

### Method 2: CLI Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Method 3: GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel will auto-detect Vite settings
5. Click "Deploy"

## Custom Domain Setup

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `cosmosdev.io`)
3. Update DNS records as instructed:
   - Add `A` record: `@` → `76.76.21.21`
   - Add `CNAME` record: `www` → `cname.vercel-dns.com`
4. Wait for SSL certificate (auto-provisioned)

## Free Subdomain Options

- **Vercel**: `yourproject.vercel.app` (auto-assigned)
- **GitHub Pages**: Use as mirror with Vercel
- **Freenom**: Free `.tk`, `.ml`, `.ga` domains
- **Namecheap**: Free with ads for first year

## Google AdSense Setup

### 1. Apply for AdSense

1. Go to [google.com/adsense](https://www.google.com/adsense)
2. Submit your application with your site URL
3. Wait for approval (usually 1-7 days)

### 2. Add AdSense Code

Once approved, replace the placeholder divs in `src/components/AdSlot.jsx`:

```jsx
export default function AdSlot({ position = 'top' }) {
  return (
    <div className="ad-slot">
      {/* Replace with your AdSense code */}
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true">
      </ins>
    </div>
  );
}
```

### 3: Load AdSense Script

Add to `index.html`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

## Environment Variables

For production builds with Vercel:

```bash
# Set Node version
vercel env add NODE_VERSION
# Select: 18.x

# Add custom environment variables
vercel env add ANALYTICS_ID
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **qrcode.react** - QR code generation
- **react-helmet-async** - SEO meta tags

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use for personal or commercial projects.

---

Built with ❤️ for developers