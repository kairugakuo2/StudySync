# StudySync Deployment Guide

## Frontend-Only Deployment (Recommended)

StudySync uses mock data and local state, so **only the frontend needs to be deployed**. The app works entirely client-side with no backend required.

---

## Deploy Frontend to Vercel

### Step 1: Install Vercel CLI
   ```bash
npm install -g vercel
   ```

### Step 2: Login to Vercel
   ```bash
   vercel login
   ```
- Follow browser prompt to authenticate

### Step 3: Navigate to Frontend Directory
   ```bash
   cd frontend
   ```

### Step 4: Deploy to Vercel
   ```bash
   vercel --prod
   ```

**Answer prompts:**
- **Link to existing project?** → `N` (first time)
- **Project name:** → `studysync-frontend` (or your choice)
- **Directory:** → `./` (press Enter for current directory)
- **Override settings?** → `N` (use vercel.json)

### Step 5: Done!
Your app is now live at `https://studysync-frontend.vercel.app`

**Note:** Don't set `VITE_API_URL` - the app will automatically use mock data when API calls fail.

---

## Alternative: Deploy to Netlify

### Step 1: Go to Netlify
1. Visit [netlify.com](https://netlify.com) and sign up/login
2. Click **"New site from Git"** → Connect GitHub
3. Select your StudySync repository

### Step 2: Configure Build Settings
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

### Step 3: Deploy
- Click **"Deploy site"**
- Your app will be live at `https://your-site.netlify.app`

**Note:** Don't add `VITE_API_URL` environment variable - the app uses mock data.

---

## Local Development (Optional)

### Frontend Only
```bash
cd frontend
npm install
npm run dev
```
App runs at `http://localhost:5173` with mock data.

### With Backend (Local Testing)
If you want to test backend locally:
```bash
# Terminal 1: Backend
cd backend
npm install
npm start
# Backend runs at http://localhost:3000

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
# Frontend runs at http://localhost:5173
```

**Note:** Backend is optional - frontend works standalone with mock data.

---

## How It Works

1. **Frontend tries to call backend API** (if `VITE_API_URL` is set)
2. **If API fails or doesn't exist** → Falls back to mock data from `frontend/src/utils/mockData.js`
3. **All state is managed locally** → Task updates, user selection, etc. work in browser memory
4. **No persistence needed** → Perfect for demos and development

---

## Environment Variables

### Frontend (Optional)
```
VITE_API_URL=  # Leave empty or unset to use mock data only
```

**If you set `VITE_API_URL`:**
- Frontend will try to call that backend
- If backend is unavailable, it gracefully falls back to mock data
- Console will show warnings but app continues working

---

## Post-Deployment Checklist

- [ ] Frontend loads correctly at your deployment URL
- [ ] All pages navigate correctly
- [ ] Mock data displays (collaborators, tasks, etc.)
- [ ] Task updates work (local state)
- [ ] User selection/login works
- [ ] No console errors (warnings about API failures are OK)

---

## Troubleshooting

### Build Failures
- Check Node version (needs >= 18)
- Verify all dependencies are in `frontend/package.json`
- Check build logs for specific errors

### Mock Data Not Loading
- Verify `frontend/src/utils/mockData.js` exists
- Check browser console for import errors
- Ensure all imports use relative paths from `frontend/src/`

### API Warnings in Console
- **This is normal!** The app tries to call backend, fails, and uses mock data
- To suppress warnings, don't set `VITE_API_URL` environment variable

---

## Why No Backend?

- **Simpler deployment** - One service instead of two
- **No costs** - Free hosting for frontend only
- **Faster** - No network latency
- **Same functionality** - Mock data + local state works perfectly
- **Easy to add backend later** - When you need real persistence
