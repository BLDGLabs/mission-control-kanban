# 🚀 Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

Vercel provides the fastest and easiest deployment for Vite apps with zero configuration.

1. **Push to GitHub** (if you haven't already):
   ```bash
   # If you need to create a GitHub repo, authenticate gh CLI first:
   gh auth login
   
   # Create and push to GitHub
   gh repo create mission-control-kanban --public --source=. --remote=origin --push
   ```

2. **Deploy to Vercel**:
   - Visit [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"
   - Your app will be live in ~30 seconds! 🎉

3. **Done!** You'll get a URL like: `https://mission-control-kanban.vercel.app`

**Automatic Updates**: Every git push to main automatically redeploys!

---

### Option 2: Netlify

Similar to Vercel, with drag-and-drop option.

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Deploy**:
   - **Option A (Drag & Drop)**: 
     - Go to [app.netlify.com/drop](https://app.netlify.com/drop)
     - Drag your `dist` folder
   
   - **Option B (Git)**:
     - Go to [app.netlify.com](https://app.netlify.com)
     - "Import from Git" → Select your repo
     - Build command: `npm run build`
     - Publish directory: `dist`

---

### Option 3: GitHub Pages

Host directly from your GitHub repository.

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add scripts to `package.json`**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update `vite.config.js`** (if deploying to `username.github.io/repo-name`):
   ```js
   export default defineConfig({
     base: '/mission-control-kanban/', // Replace with your repo name
     plugins: [react()],
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` / `root`
   - Save

6. **Visit**: `https://yourusername.github.io/mission-control-kanban`

---

### Option 4: Local Development

Just want to run it locally?

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Environment Notes

- **No backend required** - All data is stored in browser LocalStorage
- **Data persists** between page refreshes
- **Data is local** to each browser/device
- **Export/Import**: Consider adding export/import features for data backup

---

## Production Build

To build for production locally:

```bash
npm run build
```

The `dist` folder contains your production-ready static files. You can:
- Upload to any static hosting (Vercel, Netlify, GitHub Pages, etc.)
- Serve with any web server (nginx, Apache, etc.)
- Test locally: `npm run preview`

---

## Custom Domain (Optional)

### Vercel/Netlify:
1. Go to your project settings
2. Add custom domain
3. Update DNS records as instructed

### GitHub Pages:
1. Add a `CNAME` file to the `public` folder with your domain
2. Configure DNS to point to GitHub Pages
3. Enable HTTPS in repo settings

---

## Troubleshooting

**Issue**: Blank page after deployment
- Check browser console for errors
- Verify `base` path in `vite.config.js` matches your hosting path
- Ensure all assets loaded correctly (check Network tab)

**Issue**: Data not persisting
- LocalStorage may be blocked by browser settings
- Check browser privacy/security settings
- Private/Incognito mode may clear data on close

**Issue**: Drag and drop not working
- Ensure JavaScript is enabled
- Check for browser console errors
- Try a different browser

---

## Next Steps

- ⭐ Star the repo if you found this useful!
- 🐛 Report issues on GitHub
- 🎨 Customize colors/themes in `tailwind.config.js`
- 📱 Test responsive design on mobile
- 🔄 Add data export/import features
- 🔗 Connect to a backend API for multi-device sync

Happy task tracking! 🎯
