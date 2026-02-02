# GPT-Vis Official Website

Official website for GPT-Vis - AI-Native Visualization for the LLM Era.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS 4
- **TypeScript**: Full type safety
- **Deployment**: Vercel (recommended)

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Build

Build for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
site/
├── app/
│   ├── page.tsx           # Homepage
│   ├── docs/
│   │   └── page.tsx       # Documentation page
│   ├── examples/
│   │   └── page.tsx       # Examples gallery
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── public/               # Static assets
└── package.json
```

## Features

- **Homepage**: Single-page overview of GPT-Vis features and capabilities
- **Documentation**: Complete API reference, syntax guide, and integration examples
- **Examples Gallery**: Showcase of 20+ chart types with code examples
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **AI-Friendly**: Clean, maintainable code structure

## Design System

- **Primary Color**: #691eff (Purple)
- **Style**: Flat design with modern tech aesthetic
- **Typography**: System fonts for optimal performance
- **Layout**: Responsive design for all screen sizes

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

## License

MIT © AntV Team
