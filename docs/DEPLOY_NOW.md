# Quick Deployment Steps

## 🚀 Step 1: Deploy Backend to Railway

1. **Go to Railway:** https://railway.app
2. **Sign up/Login** (use GitHub for easy connection)
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Select your StudySync repository**
5. **Configure the service:**
   - Root Directory: `backend`
   - Build Command: (leave empty)
   - Start Command: `npm start`
6. **Add Environment Variables:**
   - Click on your service → Variables tab
   - Add: `NODE_ENV` = `production`
   - Add: `FRONTEND_URL` = (we'll update this after frontend deploys)
7. **Copy your backend URL** (e.g., `https://studysync-backend.railway.app`)
   - You'll see it in the service settings

**✅ Once backend is deployed, tell me your backend URL and we'll continue!**

