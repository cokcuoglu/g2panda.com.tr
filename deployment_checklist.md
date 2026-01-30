# GG_Esnaf Deployment Guide & Checklist

## Overview
This guide covers the deployment of the GG_Esnaf SaaS application to a production environment using Cloudflare, ensuring maximum security and data isolation.

## 1. Cloudflare Configuration (DNS & Network)
- [ ] **Add Site**: Add your domain (`g2panda.com.tr`) to Cloudflare.
- [ ] **DNS Records**:
    - `A` record for `api` (Backend) pointing to your Backend Server IP. (Proxy status: **Proxied/Orange**) -> `api.g2panda.com.tr`
    - `CNAME` or `A` record for `@` or `app` (Frontend) pointing to your Frontend Host (e.g., Cloudflare Pages or Nginx IP). (Proxy status: **Proxied/Orange**)
    - `A` record for `staging.api` (Staging Backend).
    - `CNAME` for `staging` (Staging Frontend).
- [ ] **SSL/TLS**:
    - Set SSL/TLS encryption mode to **Full (Strict)**.
    - Enable **Always Use HTTPS** in Edge Certificates.
    - Enable **HSTS** (HTTP Strict Transport Security) with at least 6 months duration.
    - Turn on **Automatic HTTPS Rewrites**.
- [ ] **Security**:
    - Enable **Bot Fight Mode**.
    - Configure **WAF (Web Application Firewall)** rules:
        - Rate Limit: limit requests to `/api/*` (e.g., 100 requests per minute per IP).
        - Block access to sensitive paths (e.g., `/.env`, `/.git`) matches regex `\.(env|git|yml)$`.

## 2. Backend Deployment (Node.js/Express)
### Prerequisites
- Install security packages:
  ```bash
  npm install helmet cors express-rate-limit compression
  npm install --save-dev @types/cors @types/compression
  ```

### Code Configuration (Updates Required)
- [ ] **Trust Proxy**: Enable `app.set('trust proxy', 1);` in `server.ts` so Express trusts Cloudflare headers.
- [ ] **CORS**: Configure CORS to only allow specific origins:
  ```typescript
  app.use(cors({
      origin: process.env.ALLOWED_ORIGINS?.split(','), // e.g., https://g2panda.com.tr, https://staging.g2panda.com.tr
      credentials: true
  }));
  ```
- [ ] **Helmet**: content security policy and headers.
- [ ] **Rate Limiting**: Add application-level rate limiting as a second layer of defense.

### Environment Variables (.env)
- `NODE_ENV=production` (Critical for performance and error suppression)
- `PORT=7001` (Production API port)
- `DATABASE_URL=postgres://user:pass@host:5432/db?sslmode=require`
- `JWT_SECRET=` (High entropy random string, >32 chars)
- `ALLOWED_ORIGINS=https://g2panda.com.tr,https://api.g2panda.com.tr,https://staging.g2panda.com.tr`

### Process Management
- Use **PM2** to run the backend:
    - `pm2 start dist/server.js --name "gg_esnaf_api" --env production`
    - `pm2 startup` && `pm2 save`

## 3. Frontend Deployment (Vite)
### Build Configuration
- Ensure `.env.production` exists with:
    - `VITE_API_BASE_URL=https://api.g2panda.com.tr`
- Build Command: `npm run build`

### Hosting Options
- **Option A: Cloudflare Pages (Recommended)**
    - Connect GitHub repo.
    - Build settings: Framework: Vite, Output: `dist`.
    - Add Environment Variables in Cloudflare Pages settings.
- **Option B: Nginx**
    - Configure Nginx to serve `index.html` for all 404s (SPA support).
    - enable gzip/brotli compression.
    - Cache Control:
        - `index.html`: `no-cache`
        - `/assets/*`: `public, max-age=31536000, immutable`

## 4. Database (PostgreSQL)
- [ ] **RLS Verification**: Ensure `ALTER TABLE x ENABLE ROW LEVEL SECURITY` is run on ALL user-data tables.
- [ ] **Policies**: Verify default deny is effective (i.e., if no policy matches, access is denied).
- [ ] **Backups**: Schedule daily `pg_dump` backups to an external encrypted bucket (S3/R2).

## 5. Deployment Verification Checklist
### Functional Tests
- [ ] **Login/Register**: Works on staging.
- [ ] **Session**: Refreshing page keeps user logged in.
- [ ] **Logout**: Completely clears session/token.

### Security Tests
- [ ] **Isolation**: Create User A and User B. Ensure User A cannot see User B's transactions via API ID guessing.
- [ ] **Headers**: Verify response headers include `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`.
- [ ] **IP Handling**: Check backend logs to ensure `req.ip` shows the real user IP, not Cloudflare's IP.

### Monitoring
- [ ] **Uptime**: Configure UptimeRobot or similar to ping `/health`.
- [ ] **Logs**: Ensure "Error" level logs are captured (e.g., Sentry, Datadog, or simple file logging).

## Common Mistakes to Avoid
1.  **Forgetting `trust proxy`**: Result: Express thinks all requests come from Cloudflare IPs, breaking rate limiting and IP logging.
2.  **Weak `JWT_SECRET`**: Result: Tokens can be forged.
3.  **Missing `NODE_ENV=production`**: Result: Slow performance and verbose error stack traces returned to clients.
4.  **CORS `*`**: Result: Any site can call your API.
5.  **Exposing `.git` or `.env`**: Result: Full compromise.

## Final Sign-off
- [ ] All "Critical" bugs resolved.
- [ ] Security scan (npm audit) is clean.
- [ ] Backup recovery tested.
