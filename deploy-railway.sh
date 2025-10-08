#!/bin/bash

# Dr. Desai Website Railway Deployment Script

echo "🚂 Starting Railway Deployment for Dr. Desai Website..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not initialized"
    echo "Run: git init && git add . && git commit -m 'Initial commit'"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Build the frontend
echo "🏗️ Building frontend for production..."
npm run build:production

# Check if build was successful
if [ ! -d "client/dist" ]; then
    echo "❌ Error: Frontend build failed"
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "🚂 Railway Deployment Steps:"
echo "1. Go to https://railway.app"
echo "2. Sign up with GitHub"
echo "3. Click 'New Project' → 'Deploy from GitHub repo'"
echo "4. Select your repository"
echo "5. Railway will automatically detect and create services"
echo ""
echo "📋 Environment Variables to Set:"
echo "Backend:"
echo "  NODE_ENV=production"
echo "  PORT=3000"
echo "  MONGODB_URI=mongodb+srv://drdesai_admin:DrDesai2025!@cluster.mongodb.net/drdesai"
echo "  JWT_SECRET=your_super_strong_jwt_secret_here"
echo "  CORS_ORIGIN=https://drdesaipalus.com,https://www.drdesaipalus.com"
echo ""
echo "Frontend:"
echo "  VITE_API_URL=https://your-backend-url.railway.app"
echo ""
echo "🌐 Custom Domain:"
echo "1. Add drdesaipalus.com in Railway dashboard"
echo "2. Update DNS records as shown in RAILWAY_DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 Your website will be live at https://drdesaipalus.com"
