# CI/CD Setup Guide for StudySync

## 🎯 How It Works

When any team member commits to GitHub:
1. **CI (Continuous Integration)** runs automatically:
   - Lints frontend code
   - Runs tests
   - Checks if code builds successfully
2. **CD (Continuous Deployment)** runs automatically:
   - Deploys backend to Railway (if `backend/` changed)
   - Deploys frontend to Vercel (if `frontend/` changed)

## 📋 Setup Instructions

### Option 1: Automatic Deployment (Recommended - Easiest)

This uses GitHub integration with Railway/Vercel - **no secrets needed!**

#### Step 1: Connect Railway to GitHub

1. Go to [railway.app](https://railway.app) → Your backend project
2. Go to **Settings** → **GitHub**
3. Enable **"Auto Deploy"** from GitHub
4. Select branch: `main`
5. Root Directory: `backend`
6. ✅ Railway will now auto-deploy when you push to `main`

#### Step 2: Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com) → Your frontend project
2. Go to **Settings** → **Git**
3. Enable **"Automatic deployments from Git"**
4. Production Branch: `main`
5. Root Directory: `frontend`
6. ✅ Vercel will now auto-deploy when you push to `main`

**That's it!** No GitHub secrets needed. Railway and Vercel watch your repo directly.

---

### Option 2: GitHub Actions with Secrets (More Control)

If you want GitHub Actions to trigger deployments:

#### Step 1: Get Railway Token

1. Go to Railway → Account Settings → Tokens
2. Create new token
3. Copy the token

#### Step 2: Get Vercel Tokens

1. Go to Vercel → Settings → Tokens
2. Create new token
3. Copy the token
4. Go to your project → Settings → General
5. Copy **Project ID** and **Organization ID**

#### Step 3: Add GitHub Secrets

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add these secrets:
   - `RAILWAY_TOKEN` = Your Railway token
   - `VERCEL_TOKEN` = Your Vercel token
   - `VERCEL_ORG_ID` = Your Vercel org ID
   - `VERCEL_PROJECT_ID` = Your Vercel project ID
   - `VITE_API_URL` = Your backend URL (e.g., `https://your-backend.railway.app`)

---

## 🔄 Current Workflow (No Changes Needed!)

Your team's current workflow stays the same:

```bash
# 1. Make changes
git add .
git commit -m "your message"
git push origin main

# 2. That's it! Deployment happens automatically 🚀
```

**What happens:**
- Push to `main` → CI runs → CD deploys → Live in ~2-3 minutes

---

## 📁 What Gets Deployed When

### Backend deploys when:
- Any file in `backend/` changes
- `backend/package.json` changes
- Backend workflow file changes

### Frontend deploys when:
- Any file in `frontend/` changes
- `frontend/package.json` changes
- Frontend workflow file changes

### Both deploy when:
- Root files change (README, etc.) - but only if you configure it

---

## 🛡️ Safety Features

### Pull Requests
- CI runs on PRs (linting, tests)
- **No deployment** happens on PRs (only on merge to `main`)

### Manual Trigger
- You can manually trigger deployment from GitHub Actions tab
- Useful for re-deploying without code changes

### Path-based Triggers
- Only deploys when relevant files change
- Saves build minutes and time

---

## 🐛 Troubleshooting

### "Deployment failed"
1. Check GitHub Actions tab for error logs
2. Check Railway/Vercel logs
3. Common issues:
   - Missing environment variables
   - Build errors
   - Dependency issues

### "Not deploying"
1. Check if files changed are in the right directory (`backend/` or `frontend/`)
2. Verify Railway/Vercel are connected to GitHub
3. Check branch name (must be `main`)

### "CORS errors after deployment"
1. Update `FRONTEND_URL` in Railway to match your Vercel URL
2. Update `VITE_API_URL` in Vercel to match your Railway URL
3. Redeploy both services

---

## 📊 Monitoring

- **GitHub Actions**: See all runs in the "Actions" tab
- **Railway**: See deployments in Railway dashboard
- **Vercel**: See deployments in Vercel dashboard

---

## 🎓 For Your Team

**No workflow changes needed!** Just:
1. Commit and push as usual
2. Wait 2-3 minutes
3. Check your live site

The CI/CD system handles everything automatically! 🎉

