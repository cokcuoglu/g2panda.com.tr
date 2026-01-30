# Cloudflare Tunnel Setup (Existing Tunnel)

Since you already have a tunnel running on this PC, the easiest way to add your new site is through the Cloudflare Dashboard.

1.  **Go to Cloudflare Zero Trust Dashboard**:
    *   Visit [one.dash.cloudflare.com](https://one.dash.cloudflare.com).
    *   Login with your Cloudflare account.

2.  **Navigate to Tunnels**:
    *   Go to **Networks** > **Tunnels**.
    *   Find your active tunnel (the one running on this PC).
    *   Click on the **three dots** (...) next to it and select **Configure**.

3.  **Add Public Hostname**:
    *   Click the **Public Hostname** tab.
    *   Click **Add a public hostname**.

4.  **Enter Details**:
    *   **Subdomain**: (Leave empty for root) or enter `www`.
    *   **Domain**: Select `g2panda.com.tr`.
    *   **Service Type**: `HTTP`.
    *   **URL**: `localhost:7173` (Frontend) or `localhost:7001` (API).

5.  **Save Hostname**.

6.  **Run the App**:
    *   In your terminal, run:
        ```bash
        npm run start:prod
        ```
    *(I added this command to your package.json)*.

## Production Ports:
- **Frontend (g2panda.com.tr)**: `localhost:7173`
- **API (api.g2panda.com.tr)**: `localhost:7001`

This will route:
- `g2panda.com.tr` → Your PC's Tunnel Service → Frontend on port 7173
- `api.g2panda.com.tr` → Your PC's Tunnel Service → API on port 7001
