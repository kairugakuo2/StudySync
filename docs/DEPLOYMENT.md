# StudySync Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Frontend) + Railway (Backend) - Recommended

#### Step 1: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app) and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your StudySync repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** (leave empty or `npm install`)
   - **Start Command:** `npm start` or `node src/app.js`
5. Add Environment Variable:
   - `FRONTEND_URL` = (you'll add this after frontend deploys)
   - `NODE_ENV` = `production`
6. Copy your backend URL (e.g., `https://studysync-backend.railway.app`)

#### Step 2: Deploy Frontend to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to frontend:
   ```bash
   cd frontend
   ```

4. Deploy:
   ```bash
   vercel --prod
   ```
   - Follow prompts:
     - Link to existing project? **No** (first time)
     - Project name: `studysync-frontend` (or your choice)
     - Directory: `./` (current directory)
     - Override settings? **No**

5. After deployment, copy your frontend URL (e.g., `https://studysync-frontend.vercel.app`)

#### Step 3: Link Frontend and Backend

1. **Update Vercel Environment Variable:**
   ```bash
   cd frontend
   vercel env add VITE_API_URL production
   # Enter your Railway backend URL: https://your-backend.railway.app
   ```

2. **Update Railway Environment Variable:**
   - Go to Railway dashboard → Your backend service → Variables
   - Add: `FRONTEND_URL` = `https://your-frontend.vercel.app`

3. **Redeploy both:**
   ```bash
   # Frontend
   cd frontend
   vercel --prod
   
   # Backend (via Railway dashboard - click "Redeploy")
   ```

---

### Option 2: Netlify (Frontend) + Render (Backend)

#### Backend on Render

1. Go to [render.com](https://render.com) and sign up
2. New → **Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Name:** `studysync-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   - `FRONTEND_URL` = (add after frontend deploys)
   - `NODE_ENV` = `production`
6. Copy backend URL

#### Frontend on Netlify

1. Go to [netlify.com](https://netlify.com) and sign up
2. New site from Git → Connect GitHub
3. Configure:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add Environment Variable:
   - `VITE_API_URL` = Your Render backend URL
5. Deploy

---

### Option 3: Docker Compose (Local/Server)

```bash
# Build and run both services
docker-compose up --build

# Frontend: http://localhost
# Backend: http://localhost:3000
```

---

## Environment Variables Reference

### Frontend (.env or Vercel/Netlify)
```
VITE_API_URL=https://your-backend-url.com
```

### Backend (Railway/Render)
```
PORT=3000 (auto-set by platform)
FRONTEND_URL=https://your-frontend-url.com
NODE_ENV=production
```

---

## Post-Deployment Checklist

- [ ] Backend health check: `curl https://your-backend.com/ping`
- [ ] Frontend loads correctly
- [ ] API calls work from frontend
- [ ] CORS is configured correctly
- [ ] Environment variables are set

---

## Troubleshooting

**CORS Errors:**
- Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
- Check backend logs for CORS errors

**API Not Found:**
- Verify `VITE_API_URL` is set correctly in frontend
- Check browser console for API errors
- Ensure backend routes are accessible

**Build Failures:**
- Check Node version (needs >= 18)
- Verify all dependencies are in package.json
- Check build logs for specific errors

