# 🚀 Firebase Deployment Guide

This guide will help you deploy the Country-Capital-Flag app to Firebase Hosting.

## 📋 Prerequisites

1. **Firebase CLI** installed globally
2. **Firebase project** already set up (you have one configured)
3. **Google account** with access to the Firebase project

## 🔧 Setup (One-Time)

### 1. Install Firebase CLI (if not already installed)

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

This will open a browser window for you to authenticate with your Google account.

### 3. Verify Your Project

Check that your project is correctly configured:

```bash
firebase projects:list
```

You should see your project listed. Your current project is configured in `.firebaserc`.

## 🏗️ Build & Deploy

### Quick Deploy (Recommended)

```bash
# Build the production bundle
npm run build

# Deploy to Firebase
firebase deploy
```

### Step-by-Step Deploy

```bash
# 1. Build the production-optimized bundle
npm run build

# 2. (Optional) Preview the build locally
npm run preview

# 3. Deploy to Firebase Hosting
firebase deploy --only hosting

# 4. (Optional) Deploy with a message
firebase deploy -m "Upgraded to React 18 and Vite"
```

## 📁 Build Output

After running `npm run build`, Vite will create a `dist` folder containing:
- Optimized JavaScript bundles
- Minified CSS
- Compressed assets
- `index.html` entry point

Firebase will deploy the contents of this `dist` folder as configured in `firebase.json`.

## 🔍 Deployment Commands Reference

### Deploy Everything
```bash
firebase deploy
```

### Deploy Only Hosting
```bash
firebase deploy --only hosting
```

### Deploy to Specific Project
```bash
firebase deploy --project your-project-id
```

### Preview Changes (Temporary URL)
```bash
firebase hosting:channel:deploy preview
```

## 🌐 Access Your Deployed App

After deployment, Firebase will provide you with:
- **Hosting URL**: `https://your-project-id.web.app`
- **Custom Domain** (if configured): Your custom domain

## 🛠️ Troubleshooting

### Issue: "Firebase command not found"
**Solution**: Install Firebase CLI globally
```bash
npm install -g firebase-tools
```

### Issue: "Not authorized"
**Solution**: Re-login to Firebase
```bash
firebase logout
firebase login
```

### Issue: "Build folder not found"
**Solution**: Make sure to build first
```bash
npm run build
```

### Issue: "Wrong project"
**Solution**: Check your `.firebaserc` file or use:
```bash
firebase use your-project-id
```

## 📊 Deployment Checklist

Before deploying, make sure:

- [ ] All tests pass (if you have tests)
- [ ] `npm run build` completes successfully
- [ ] No console errors in production build
- [ ] Environment variables are set (if any)
- [ ] Firebase CLI is logged in
- [ ] Correct Firebase project is selected

## 🔄 Continuous Deployment (Optional)

### Using GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci --legacy-peer-deps
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: your-project-id
```

## 📝 Post-Deployment

After successful deployment:

1. **Test the live site** - Visit your Firebase URL
2. **Check all features**:
   - Country search
   - Flag clicks and modals
   - Quiz functionality
   - Timer
   - Map interactions
3. **Monitor Firebase Console** - Check hosting metrics
4. **Set up custom domain** (optional) - In Firebase Console → Hosting

## 🎯 Quick Reference

```bash
# Login
firebase login

# Build
npm run build

# Deploy
firebase deploy

# View deployment history
firebase hosting:sites:list

# Rollback to previous version (if needed)
# Go to Firebase Console → Hosting → Release history
```

## 📞 Need Help?

- **Firebase Documentation**: https://firebase.google.com/docs/hosting
- **Firebase Console**: https://console.firebase.google.com
- **Vite Build Docs**: https://vitejs.dev/guide/build.html

---

**Happy Deploying! 🚀**
