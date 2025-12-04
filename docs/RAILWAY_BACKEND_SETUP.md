# Railway Backend Deployment Settings

## ✅ Required Settings

### Source
- **Root Directory:** `/backend` ✅ (already set correctly)
- **Branch:** `main` ✅ (already set correctly)
- **Wait for CI:** ✅ **Enable this** (waits for GitHub Actions to pass before deploying)

### Build
- **Builder:** `Railpack` or `Default` (both work fine)
- **Build Command:** Leave **empty** (Railway auto-detects `npm install`)
- **Custom Build Command:** Leave **empty** (not needed)
- **Watch Paths:** Add pattern: `/backend/**` (only redeploy when backend files change)

### Deploy
- **Start Command:** `npm start` ✅ (already set correctly)
- **Pre-deploy step:** Leave **empty**

### Networking
- **Public Networking:** ✅ **Enable this** (you need HTTP access)
- **Generate Domain:** ✅ **Click this** to get your backend URL
  - Example: `studysync-backend.railway.app`
  - **Copy this URL - you'll need it for frontend!**

### Environment Variables
Click **"Variables"** tab and add:
```
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```
*(Update FRONTEND_URL after you deploy frontend)*

### Healthcheck
- **Healthcheck Path:** `/ping` ✅ (your backend has this endpoint)

### Resource Limits
- **CPU:** 1 vCPU (default is fine for now)
- **Memory:** 512 MB (default is fine for now)
- You can upgrade later if needed

### Restart Policy
- **On Failure:** ✅ **Enable this**
- **Max restart retries:** 10 (default is fine)

### Other Settings
- **Regions:** US West (or closest to you)
- **Replicas:** 1 (default)
- **Serverless:** ❌ **Disable** (not needed for backend API)
- **Cron Schedule:** Leave empty
- **Config-as-code:** Leave empty (optional, for advanced use)

---

## 🎯 Quick Checklist

- [ ] Root Directory: `/backend`
- [ ] Branch: `main`
- [ ] Wait for CI: **Enabled**
- [ ] Start Command: `npm start`
- [ ] Public Networking: **Enabled**
- [ ] Domain generated (copy the URL!)
- [ ] Environment Variables added:
  - [ ] `NODE_ENV=production`
  - [ ] `FRONTEND_URL` (add after frontend deploys)
- [ ] Healthcheck Path: `/ping`
- [ ] Watch Paths: `/backend/**`

---

## 🚀 After Setup

1. Click **"Update"** or **"Deploy"** button
2. Railway will:
   - Install dependencies
   - Start your backend
   - Give you a public URL
3. Test your backend:
   ```bash
   curl https://your-backend.railway.app/ping
   # Should return: {"message":"pong"}
   ```
4. Copy your backend URL for frontend configuration!

---

## 📝 Notes

- **Watch Paths** ensures Railway only redeploys when backend files actually change
- **Wait for CI** ensures your GitHub Actions tests pass before deploying
- The domain Railway gives you is your backend API URL
- Update `FRONTEND_URL` environment variable after you deploy frontend


