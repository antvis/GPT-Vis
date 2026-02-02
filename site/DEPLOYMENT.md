# Deployment Guide

This guide covers various deployment options for the GPT-Vis official website.

## Quick Deploy with Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/antvis/GPT-Vis/tree/main/site)

1. **Connect to Vercel**:
   - Sign in to [Vercel](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

2. **Configure Build Settings**:
   - Root Directory: `site`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Get a production URL instantly

## Deploy with Netlify

1. **Connect Repository**:
   - Sign in to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository

2. **Configure Build**:
   - Base directory: `site`
   - Build command: `npm run build`
   - Publish directory: `.next`

3. **Deploy**:
   - Click "Deploy site"
   - Netlify will handle the rest

## Self-Hosted Deployment

### Using Node.js

1. **Build the site**:

   ```bash
   cd site
   npm install
   npm run build
   ```

2. **Start the server**:

   ```bash
   npm start
   ```

3. **Access the site**:
   - Open http://localhost:3000

### Using Docker

1. **Create Dockerfile** (site/Dockerfile):

   ```dockerfile
   FROM node:18-alpine AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci

   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV production

   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next ./.next
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/package.json ./package.json

   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and run**:
   ```bash
   docker build -t gpt-vis-website .
   docker run -p 3000:3000 gpt-vis-website
   ```

## Deploy to GitHub Pages

1. **Update next.config.ts**:

   ```typescript
   const nextConfig = {
     output: 'export',
     basePath: '/GPT-Vis',
     images: { unoptimized: true },
   };
   ```

2. **Build and export**:

   ```bash
   npm run build
   ```

3. **Deploy**:
   - Push the `.next` folder to `gh-pages` branch
   - Configure GitHub Pages to use this branch

## Environment Variables

No environment variables are required for basic deployment. For custom configurations:

```bash
# .env.local (optional)
NEXT_PUBLIC_SITE_URL=https://gpt-vis.antv.vision
```

## Production Optimizations

### Performance

- ✅ Next.js 14 with Turbopack
- ✅ Static page generation
- ✅ Image optimization
- ✅ Code splitting
- ✅ Tree shaking

### SEO

- ✅ Meta tags configured
- ✅ Open Graph tags
- ✅ Sitemap (can be added)
- ✅ Robots.txt (can be added)

### Monitoring

Consider adding:

- Google Analytics
- Vercel Analytics
- Error tracking (Sentry)

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test navigation links
- [ ] Check mobile responsiveness
- [ ] Verify SEO meta tags
- [ ] Test GitHub links
- [ ] Configure custom domain (if needed)
- [ ] Set up SSL certificate
- [ ] Configure CDN (if needed)

## Custom Domain

### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS records

## Troubleshooting

### Build Fails

- Check Node.js version (18+ required)
- Clear `.next` folder and rebuild
- Verify all dependencies are installed

### Pages Not Loading

- Check build output directory
- Verify base path configuration
- Check server logs

### Styling Issues

- Ensure Tailwind CSS is properly configured
- Check globals.css is imported
- Verify PostCSS configuration

## Support

For deployment issues:

- Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- Visit [GitHub Issues](https://github.com/antvis/GPT-Vis/issues)
- Contact the AntV team

## License

MIT © AntV Team
