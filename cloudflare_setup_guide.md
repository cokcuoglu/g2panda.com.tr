# Cloudflare Configuration Guide for g2panda.com.tr

Follow these steps to correctly configure Cloudflare for your application.

## 1. Add Site
1.  Log in to your Cloudflare Dashboard.
2.  Click **"Add a Site"**.
3.  Enter: `g2panda.com.tr`.
4.  Select the **Free Plan** (or higher if you have it) and click Continue.
5.  Cloudflare will scan for existing DNS records. Review them, but we will likely change them.
6.  **Update Nameservers**: Go to your domain registrar (where you bought `g2panda.com.tr`) and replace their nameservers with the two provided by Cloudflare (e.g., `bob.ns.cloudflare.com`, `lola.ns.cloudflare.com`).
7.  Wait for propagation (can take 1-24 hours, usually fast).

## 2. DNS Configuration
Go to the **DNS** tab in Cloudflare. You need to add the following records:

| Type | Name | Content (The Value) | Proxy Status | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `api` | `[YOUR_VPS_IP_ADDRESS]` | **Proxied (Orange)** | Points `api.g2panda.com.tr` to your backend server. |
| **CNAME**| `@` (Root) | `[YOUR_FRONTEND_HOST]` | **Proxied (Orange)** | Points `g2panda.com.tr` to your frontend (e.g., `yourapp.pages.dev`). |
| **CNAME**| `www` | `g2panda.com.tr` | **Proxied (Orange)** | Redirects `www` to non-www (if configured). |

*Note: Replace `[YOUR_VPS_IP_ADDRESS]` with the actual public IP of your backend server.*
*Note: If hosting frontend on Cloudflare Pages, use the Pages URL (e.g., `project-name.pages.dev`) as the CNAME target.*

## 3. SSL/TLS Settings (Critical)
Go to the **SSL/TLS** tab:
1.  **Overview**: Set encryption mode to **Full (Strict)**.
    *   *Why?* You will generate a free "Origin Certificate" in the next step to secure the connection between Cloudflare and your server.
2.  **Edge Certificates**:
    *   **Always Use HTTPS**: **ON**
    *   **Automatic HTTPS Rewrites**: **ON**
    *   **HSTS**: Enable, set max-age to 6 months (`15552000` seconds), include subdomains. **(Do this only after verifying everything works!)**

## 4. Origin Server Setup (For Full Strict SSL)
To make "Full (Strict)" work, your backend server must have a valid certificate relative to Cloudflare.
1.  Go to **SSL/TLS** > **Origin Server**.
2.  Click **Create Certificate**.
3.  Keep default settings (RSA 2048, relevant hostnames).
4.  Click **Create**.
5.  **Save these files on your Backend Server**:
    *   Copy "Origin Certificate" content -> Save as `server.crt`
    *   Copy "Private Key" content -> Save as `server.key`
6.  **Configure Nginx/manager on your backend** to use these certificates for SSL on port 443 (or pass them to Node.js if running directly, though Nginx reverse proxy is recommended).

## 5. Security & WAF
Go to **Security** > **WAF** (Web Application Firewall):
1.  **Create Rule**: Name it "Protect Sensitive Routes".
2.  **Expression Editor**:
    ```text
    (http.request.uri.path contains "/.env") or (http.request.uri.path contains "/.git")
    ```
3.  **Action**: Block.

Go to **Security** > **Settings**:
1.  **Security Level**: Medium (Default) is usually fine.
2.  **Bot Fight Mode**: **ON** (Blocks known malicious bots).

## 6. Page Rules (Optional but Recommended)
Go to **Rules** > **Page Rules**:
1.  **Cache Static Assets**:
    *   URL: `g2panda.com.tr/assets/*`
    *   Setting: **Browser Cache TTL** -> a year (or high value).
    *   Setting: **Cache Level** -> Cache Everything.

## 7. Verification
Once configured:
1.  Visit `https://g2panda.com.tr`. The lock icon should appear.
2.  Your API calls in the browser network tab should go to `https://api.g2panda.com.tr/...`.
3.  Check Cloudflare dashboard for "Active" status on the overview page.
