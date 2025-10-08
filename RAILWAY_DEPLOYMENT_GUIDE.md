# 🚂 Deploy Dr. Desai Website to Railway (FREE)

## Why Railway is Perfect for Your Project

✅ **Better than Render for full-stack apps**
✅ **Automatic deployments from GitHub**
✅ **Built-in database support**
✅ **Custom domain support**
✅ **No cold starts (always running)**
✅ **Better performance**
✅ **Free tier with generous limits**

---

## 🚀 Quick Start (5 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### Step 2: Deploy to Railway

1. **Go to [railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**

### Step 3: Configure Services

Railway will automatically detect your project structure and create two services:

#### Backend Service (Node.js)
- **Name**: `dr-desai-backend`
- **Build Command**: `npm install && cd server && npm install`
- **Start Command**: `cd server && npm start`
- **Port**: Auto-detected

#### Frontend Service (Static)
- **Name**: `dr-desai-frontend`
- **Build Command**: `npm install && cd client && npm install && npm run build`
- **Output Directory**: `client/dist`

---

## ⚙️ Environment Variables Setup

### Backend Environment Variables:
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://drdesai_admin:DrDesai2025!@cluster.mongodb.net/drdesai
JWT_SECRET=your_super_strong_jwt_secret_here_at_least_32_characters
CORS_ORIGIN=https://drdesaipalus.com,https://www.drdesaipalus.com
```

### Frontend Environment Variables:
```
VITE_API_URL=https://your-backend-url.railway.app
```

---

## 🌐 Custom Domain Setup

### Step 1: Add Custom Domain
1. Go to your frontend service
2. Click "Settings" → "Domains"
3. Add `drdesaipalus.com` and `www.drdesaipalus.com`

### Step 2: Update DNS
In your domain registrar (where you bought drdesaipalus.com):

```
Type: CNAME
Name: www
Value: your-frontend-url.railway.app

Type: A
Name: @
Value: 76.76.19.61
```

---

## 🗄️ Database Setup (MongoDB Atlas)

### Option 1: Use Railway's MongoDB (Recommended)
1. In Railway dashboard, click "New"
2. Select "Database" → "MongoDB"
3. Railway will provide connection string automatically
4. Use this in your `MONGODB_URI` environment variable

### Option 2: Keep MongoDB Atlas
1. Use your existing MongoDB Atlas connection
2. Update `MONGODB_URI` with your Atlas string

---

## 📋 Railway vs Render Comparison

| Feature | Railway | Render |
|---------|---------|--------|
| **Cold Starts** | ❌ None (always running) | ✅ 15 min sleep |
| **Build Speed** | ⚡ Faster | 🐌 Slower |
| **Database** | ✅ Built-in MongoDB | ❌ External only |
| **Custom Domain** | ✅ Easy setup | ✅ Easy setup |
| **Free Tier** | ✅ $5 credit/month | ✅ 750 hours/month |
| **Performance** | ⚡ Better | 🐌 Good |

---

## 🎯 Railway Advantages

### 1. **No Cold Starts**
- Your app is always running
- No 30-second wait time
- Better user experience

### 2. **Built-in Database**
- Railway provides MongoDB
- No need for external Atlas setup
- Automatic connection string

### 3. **Better Performance**
- Faster builds
- Better resource allocation
- More reliable deployments

### 4. **Easier Management**
- Single dashboard for everything
- Automatic environment variables
- Better logging and monitoring

---

## 🔧 Configuration Files Created

### `railway.json`
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

### `nixpacks.toml`
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

---

## 🚀 Deployment Process

### Automatic Deployment:
1. **Push to GitHub** → Railway auto-deploys
2. **Environment variables** → Set in Railway dashboard
3. **Custom domain** → Add in Railway settings
4. **Database** → Railway provides MongoDB

### Manual Deployment:
1. Connect GitHub repository
2. Railway detects Node.js + React structure
3. Creates two services automatically
4. Configure environment variables
5. Deploy!

---

## 💰 Pricing

### Free Tier:
- **$5 credit per month**
- **More than enough for your app**
- **No time limits**
- **Always running**

### Paid Plans:
- Start at $5/month
- Only if you exceed free credits

---

## 🎉 Your Website Will Be Live At:

- **Frontend**: `https://drdesaipalus.com`
- **Backend API**: `https://your-backend-url.railway.app`
- **Database**: Railway MongoDB (or Atlas)

---

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails**: Check build logs in Railway dashboard
2. **Environment Variables**: Ensure all required vars are set
3. **Database Connection**: Verify MongoDB URI is correct
4. **CORS Errors**: Update CORS_ORIGIN with your domain

### Debug Steps:
1. Check Railway service logs
2. Test API endpoints
3. Verify environment variables
4. Check browser console

---

## ✅ Success Checklist

- [ ] Repository pushed to GitHub
- [ ] Railway project created
- [ ] Backend service deployed
- [ ] Frontend service deployed
- [ ] Environment variables set
- [ ] Custom domain configured
- [ ] Database connected
- [ ] Website accessible at drdesaipalus.com

---

**Railway is the perfect choice for your Dr. Desai website!** 🚂✨

**Ready to deploy? Just push to GitHub and connect to Railway!** 🚀
