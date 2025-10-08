# 🚀 Deploy Dr. Desai Website to Render.com (FREE)

## Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

## Step 2: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Connect your GitHub repository

## Step 3: Deploy Backend (Node.js API)

1. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Choose your repository

2. **Configure Backend Service**:
   - **Name**: `dr-desai-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Plan**: `Free`

3. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_strong_jwt_secret_here
   CORS_ORIGIN=https://drdesaipalus.com,https://www.drdesaipalus.com
   ```

4. **Deploy**: Click "Create Web Service"

## Step 4: Deploy Frontend (React App)

1. **Create New Static Site**:
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configure Frontend**:
   - **Name**: `dr-desai-frontend`
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/dist`
   - **Plan**: `Free`

3. **Environment Variables**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

4. **Deploy**: Click "Create Static Site"

## Step 5: Configure Custom Domain

1. **In Render Dashboard**:
   - Go to your frontend service
   - Click "Settings" → "Custom Domains"
   - Add `drdesaipalus.com` and `www.drdesaipalus.com`

2. **Update DNS Settings** (in your domain registrar):
   ```
   Type: CNAME
   Name: www
   Value: your-frontend-url.onrender.com

   Type: A
   Name: @
   Value: 76.76.19.61 (Render's IP)
   ```

## Step 6: Update Environment Variables

After deployment, update your backend environment variables with the actual frontend URL:

```
CORS_ORIGIN=https://drdesaipalus.com,https://www.drdesaipalus.com,https://your-frontend-url.onrender.com
```

## Step 7: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account** (if not done):
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create free cluster

2. **Configure Database**:
   - Create database: `drdesai`
   - Add user with read/write permissions
   - Get connection string

3. **Update Environment Variables**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/drdesai?retryWrites=true&w=majority
   ```

## 🎉 Your Website Will Be Live At:
- **Frontend**: `https://drdesaipalus.com`
- **Backend API**: `https://your-backend-url.onrender.com`

## 📋 Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test user login
- [ ] Test appointment booking
- [ ] Test doctor features
- [ ] Check mobile responsiveness
- [ ] Verify HTTPS is working
- [ ] Test all API endpoints

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure CORS_ORIGIN includes your domain
2. **Build Failures**: Check build logs in Render dashboard
3. **Database Connection**: Verify MongoDB Atlas connection string
4. **Environment Variables**: Ensure all required variables are set

### Render Free Tier Limitations:
- Services sleep after 15 minutes of inactivity
- Cold start takes ~30 seconds
- 750 hours/month free
- Perfect for small to medium applications

## 💡 Pro Tips:

1. **Keep Services Active**: Use a service like UptimeRobot to ping your backend every 14 minutes
2. **Monitor Logs**: Check Render dashboard for any errors
3. **Backup Database**: Set up regular MongoDB Atlas backups
4. **SSL Certificate**: Render provides free SSL certificates

---

**Your Dr. Desai website will be fully functional with this setup!** 🏥✨
