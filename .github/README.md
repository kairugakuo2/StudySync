# GitHub Actions Workflows

This directory contains CI/CD workflows for automatic deployment.

## Workflows

### `ci.yml`
- Runs on every push and pull request
- Lints frontend code
- Runs tests
- Checks if code builds
- **Does NOT deploy** (just checks code quality)

### `deploy-backend.yml`
- Runs when `backend/` files change
- Deploys backend to Railway
- Only runs on `main` branch

### `deploy-frontend.yml`
- Runs when `frontend/` files change
- Deploys frontend to Vercel
- Only runs on `main` branch

### `railway-simple.yml` & `vercel-simple.yml`
- Placeholder workflows
- Use if Railway/Vercel are connected via GitHub integration (recommended)

## How It Works

1. Team member commits and pushes to `main`
2. GitHub Actions automatically:
   - Runs CI checks (linting, tests)
   - Deploys backend if `backend/` changed
   - Deploys frontend if `frontend/` changed
3. Site is live in ~2-3 minutes

## Setup

See `CICD_SETUP.md` in the root directory for detailed setup instructions.


