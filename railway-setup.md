# 🚂 Railway Setup for Dr. Desai Website

## Why Choose Railway Over Render?

| Feature | Railway | Render |
|---------|---------|--------|
| **Cold Starts** | ❌ None (always running) | ✅ 15 min sleep |
| **Build Speed** | ⚡ Much faster | 🐌 Slower |
| **Database** | ✅ Built-in MongoDB | ❌ External only |
| **Performance** | ⚡ Better | 🐌 Good |
| **Ease of Use** | ⚡ Simpler | 🐌 More complex |
| **Free Tier** | ✅ $5 credit/month | ✅ 750 hours/month |

## 🚀 Quick Deployment (3 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### Step 2: Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway auto-detects your full-stack app!

### Step 3: Configure Services
Railway will create two services automatically:
- **Backend**: Node.js API server
- **Frontend**: React static site

### Step 4: Set Environment Variables

**Backend Service:**
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://drdesai_admin:DrDesai2025!@cluster.mongodb.net/drdesai
JWT_SECRET=your_super_strong_jwt_secret_here_at_least_32_characters
CORS_ORIGIN=https://drdesaipalus.com,https://www.drdesaipalus.com
```

**Frontend Service:**
```
VITE_API_URL=https://your-backend-url.railway.app
```

### Step 5: Add Custom Domain
1. Go to frontend service → Settings → Domains
2. Add `drdesaipalus.com` and `www.drdesaipalus.com`
3. Update DNS records in your domain registrar

## 🎯 Railway Advantages

### 1. **No Cold Starts**
- Your app is always running
- No waiting time for users
- Better user experience

### 2. **Built-in Database**
- Railway provides MongoDB
- No external setup needed
- Automatic connection

### 3. **Better Performance**
- Faster builds and deployments
- Better resource allocation
- More reliable

### 4. **Easier Management**
- Single dashboard
- Automatic environment variables
- Better monitoring

## 📁 Files Created for Railway

- `railway.json` - Railway configuration
- `nixpacks.toml` - Build configuration
- `RAILWAY_DEPLOYMENT_GUIDE.md` - Detailed guide
- `deploy-railway.sh` - Deployment script

## 🔧 Configuration Details

### Railway.json
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd server && npm start",
    "healthcheckPath": "/api/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Nixpacks.toml
```toml
[phases.setup]
nixPkgs = ["nodejs", "npm"]

[phases.install]
cmds = [
  "npm install",
  "cd server && npm install",
  "cd ../client && npm install"
]

[phases.build]
cmds = [
  "cd client && npm run build"
]

[start]
cmd = "cd server && npm start"
```

## 💰 Cost

### Free Tier:
- **$5 credit per month**
- **More than enough for your app**
- **No time limits**
- **Always running**

## 🎉 Result

Your Dr. Desai website will be live at:
- **Frontend**: `https://drdesaipalus.com`
- **Backend**: `https://your-backend-url.railway.app`
- **Database**: Railway MongoDB

## ✅ Ready to Deploy?

1. **Push to GitHub**: `git push origin main`
2. **Go to Railway**: [railway.app](https://railway.app)
3. **Deploy**: Connect your repository
4. **Configure**: Set environment variables
5. **Live**: Your website is ready!

---

**Railway is the perfect choice for your Dr. Desai website!** 🚂✨
