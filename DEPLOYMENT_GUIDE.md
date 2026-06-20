# Deployment Guide

## Overview

This guide covers deploying the Analytics Dashboard to various platforms including ArcForge, Vercel, Netlify, and traditional servers.

## Pre-Deployment Checklist

- [ ] All dependencies installed: `npm install`
- [ ] Build succeeds without errors: `npm run build`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No ESLint warnings: `npm run lint`
- [ ] All tests pass
- [ ] Environment variables configured
- [ ] README.md updated
- [ ] Version number updated in package.json

## Building for Production

```bash
# Install dependencies
npm install

# Build the application
npm run build

# The optimized build will be in the 'dist' directory
```

Build output includes:
- Minified JavaScript and CSS
- Optimized assets
- Source maps for debugging
- Gzip compression ready

## Deployment Options

### Option 1: ArcForge (Recommended)

ArcForge provides a native deployment experience for web applications.

#### Steps:

1. **Initialize ArcForge Project**
   ```bash
   # Create ArcForge project
   arcforge init
   ```

2. **Build Locally**
   ```bash
   npm run build
   ```

3. **Deploy to ArcForge**
   ```bash
   arcforge deploy
   ```

4. **Access Your Application**
   - ArcForge provides a live URL
   - Share URL with team

#### ArcForge Configuration

Create `arcforge.config.json`:
```json
{
  "name": "analytics-dashboard",
  "description": "Production-Ready Analytics Dashboard",
  "buildCommand": "npm run build",
  "outputDir": "dist",
  "environment": "production"
}
```

### Option 2: Vercel

Perfect for quick deployments with minimal configuration.

#### Steps:

1. **Connect GitHub Repository**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your repository

2. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Node.js Version: 18.x

3. **Deploy**
   - Vercel automatically deploys on push
   - Live preview for each commit

#### Vercel Environment Variables
```bash
# Create .env.production.local
VITE_API_URL=https://api.example.com
```

### Option 3: Netlify

Easy deployment with continuous integration.

#### Steps:

1. **Connect Git Repository**
   - Go to https://netlify.com
   - Click "Add new site"
   - Select "Import an existing project"

2. **Configure Build**
   - Repository: Select your repo
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

#### Netlify Configuration (`netlify.toml`)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 4: Docker Deployment

#### Create Dockerfile
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine
RUN npm install -g serve

WORKDIR /app
COPY --from=builder /app/dist ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

#### Build and Run
```bash
# Build image
docker build -t analytics-dashboard .

# Run container
docker run -p 3000:3000 analytics-dashboard
```

### Option 5: Traditional Server (Node.js)

#### Setup

1. **Install Node.js** (16+)
   ```bash
   curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install Serving Tool**
   ```bash
   npm install -g serve
   ```

3. **Build and Deploy**
   ```bash
   npm run build
   serve -s dist -l 3000
   ```

4. **PM2 Process Management**
   ```bash
   npm install -g pm2
   pm2 start "serve -s dist -l 3000" --name "dashboard"
   pm2 startup
   pm2 save
   ```

#### Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 6: AWS Amplify

#### Steps:

1. **Initialize Amplify**
   ```bash
   amplify init
   ```

2. **Add Hosting**
   ```bash
   amplify add hosting
   # Select "Hosting with Amplify Console"
   ```

3. **Deploy**
   ```bash
   amplify publish
   ```

## Environment Variables

### Production Configuration

Create `.env.production`:
```
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=Analytics Dashboard
VITE_APP_VERSION=1.0.0
```

### Access in Code
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Performance Optimization

### For All Deployments

1. **Enable Compression**
   - Gzip compression for text files
   - Brotli for better compression

2. **Cache Headers**
   ```
   # Cache static assets for 1 year
   *.js, *.css: max-age=31536000
   
   # Cache HTML for 24 hours
   *.html: max-age=86400
   ```

3. **CDN Usage**
   - Serve static assets from CDN
   - Improves load times globally

4. **Lazy Loading**
   - Already implemented in routes
   - Chart components load on demand

### Monitoring Deployment

#### Vercel Analytics
```bash
# Included by default in Vercel
```

#### Netlify Analytics
```bash
# Enable in Netlify dashboard
```

#### Custom Monitoring
```typescript
// Add to main.tsx
import { reportWebVitals } from 'web-vitals'

reportWebVitals(metric => {
  console.log(metric)
  // Send to analytics service
})
```

## Security Considerations

1. **HTTPS Only**
   - All deployments must use HTTPS
   - Redirect HTTP to HTTPS

2. **Security Headers**
   ```
   X-Content-Type-Options: nosniff
   X-Frame-Options: DENY
   X-XSS-Protection: 1; mode=block
   Referrer-Policy: no-referrer
   ```

3. **Content Security Policy**
   ```
   default-src 'self'
   script-src 'self' 'unsafe-inline'
   style-src 'self' 'unsafe-inline'
   ```

4. **API Security**
   - Use HTTPS for all API calls
   - Implement CORS properly
   - Validate all user inputs

## Rollback Procedures

### Vercel
```bash
# View deployments
vercel list

# Promote previous deployment
vercel promote <deployment-url>
```

### Netlify
- Use Netlify dashboard to rollback
- Select previous deployment
- Click "Publish deploy"

### Docker
```bash
# Tag and push specific version
docker tag analytics-dashboard:latest analytics-dashboard:v1.0.0
docker push analytics-dashboard:v1.0.0

# Run specific version
docker run analytics-dashboard:v1.0.0
```

## Monitoring & Logging

### Enable Error Tracking

```typescript
// Add error logging
window.addEventListener('error', (event) => {
  console.error('Error:', event.error)
  // Send to error tracking service
})
```

### Monitor Performance

```bash
# Use Lighthouse CI
npm install -g @lhci/cli@latest
lhci autorun
```

## Troubleshooting Deployments

### Build Fails
- Clear cache: `npm ci` instead of `npm install`
- Check Node.js version compatibility
- Verify environment variables

### App Not Loading
- Check browser console for errors
- Verify API endpoints
- Check network requests

### Slow Performance
- Run Lighthouse audit
- Optimize images
- Enable compression
- Use CDN for static assets

### CORS Errors
- Verify API endpoints
- Check CORS headers on backend
- Update API configuration

## Maintenance

### Post-Deployment

1. **Monitor Performance**
   - Check Core Web Vitals
   - Monitor error rates
   - Track user experience

2. **Regular Updates**
   - Update dependencies regularly
   - Security patches
   - Performance improvements

3. **Backups**
   - Database backups
   - Configuration backups
   - Document recovery procedures

### Scheduled Maintenance

```bash
# Schedule automatic deployments
0 2 * * * /path/to/deploy.sh  # 2 AM daily
```

## Support & Documentation

- **Documentation**: See README.md and DEVELOPMENT_GUIDE.md
- **Issues**: GitHub Issues or platform-specific support
- **Performance**: Use platform-specific monitoring tools

## Next Steps

1. Choose your deployment platform
2. Follow platform-specific instructions
3. Configure environment variables
4. Deploy and test
5. Monitor performance
6. Plan rollback strategy

---

**Deployment Complete! 🎉**

Your Analytics Dashboard is now live and ready to use.
