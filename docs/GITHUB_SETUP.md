# GitHub API + Polling Setup Guide

This guide explains how to set up the GitHub-based collaborative data storage system.

## Overview

The app uses a single shared JSON file in a GitHub repository for collaborative data storage:
- **Reading**: Public GitHub repo (no auth needed)
- **Writing**: Vercel serverless function (uses GitHub PAT from env vars)
- **Polling**: Every 8 seconds to detect changes
- **Auth**: Fake login (username dropdown)

## Setup Steps

### 1. Create GitHub Repository

1. Create a new GitHub repository (public or private)
2. Create the following structure:
   ```
   your-repo/
     data/
       workspace.json
   ```

3. Initialize `data/workspace.json` with this structure:
   ```json
   {
     "workspaces": {},
     "tasks": {},
     "notes": {},
     "whiteboards": {},
     "files": {},
     "version": 0,
     "lastModified": "2025-01-15T10:00:00Z"
   }
   ```

### 2. Create GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Name it: `StudySync Vercel Token`
4. Select scope: **`repo`** (Full control of private repositories)
5. Generate token and **copy it** (you won't see it again!)

### 3. Configure Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the following variables:

   **Variable Name**: `GITHUB_PAT`  
   **Value**: `ghp_your_token_here` (paste the token you copied)

   **Variable Name**: `GITHUB_REPO` (optional)  
   **Value**: `your-username/your-repo-name`

   **Variable Name**: `GITHUB_BRANCH` (optional)  
   **Value**: `main` (or `master`)

4. Redeploy your application for changes to take effect

### 4. Configure Frontend Environment Variables (Optional)

If you want to override the default repo, create a `.env` file in `frontend/`:

```env
VITE_GITHUB_REPO=your-username/your-repo-name
VITE_GITHUB_BRANCH=main
```

Or set these in Vercel's environment variables (they'll be available at build time).

### 5. Test the Setup

1. Deploy to Vercel
2. Visit your app
3. Use "Demo Login" to select a user
4. Navigate to a workspace
5. Make changes (notes, whiteboard, files)
6. Changes should save to GitHub after 2 seconds
7. Open the workspace in another browser/tab
8. Changes should appear within 8 seconds (polling interval)

## How It Works

### Reading Data
- Frontend polls `https://raw.githubusercontent.com/your-repo/main/data/workspace.json` every 8 seconds
- No authentication needed (public repo)
- Uses version number to detect changes

### Writing Data
- Frontend calls `/api/github/update` (Vercel serverless function)
- Serverless function uses `GITHUB_PAT` from environment variables
- Token is **never exposed** to the browser
- Rate limiting: 10 writes per minute per client IP

### Fake Login
- Users select username from dropdown
- No real authentication
- Username stored in localStorage
- Used for tracking who made changes

## File Structure

```
frontend/
  api/
    github/
      update.js          ← Vercel serverless function
  src/
    services/
      authService.js     ← Fake login service
      githubDataService.js ← Read/write functions
      workspacePoller.js ← Polling mechanism
    components/
      DemoLogin.jsx      ← Username dropdown
    hooks/
      useWorkspaceData.js ← GitHub data hook
```

## API Protection

The serverless function includes rate limiting:
- **Limit**: 10 requests per minute per client IP
- **Response**: 429 status code if exceeded
- **Reset**: After 1 minute

## Troubleshooting

### Changes not appearing
- Check GitHub repo is public (or token has access)
- Verify `GITHUB_PAT` is set in Vercel
- Check browser console for errors
- Verify polling is running (check network tab)

### Rate limit errors
- Wait 1 minute before trying again
- Reduce write frequency (already debounced to 2 seconds)

### 404 errors when reading
- Verify repo name is correct
- Check branch name (`main` vs `master`)
- Ensure `data/workspace.json` exists in repo

### 401/403 errors when writing
- Verify `GITHUB_PAT` is valid
- Check token has `repo` scope
- Ensure token hasn't expired

## Security Notes

✅ **Secure:**
- GitHub PAT never exposed to browser
- Token only in Vercel serverless function
- Rate limiting prevents abuse

⚠️ **Consider:**
- Public repo = anyone can read data
- No user authentication = anyone can call API
- Consider adding basic validation in serverless function

## Next Steps

1. Set up GitHub repo and token
2. Configure Vercel environment variables
3. Deploy to Vercel
4. Test collaborative features
5. Monitor GitHub API rate limits (5,000/hour)

