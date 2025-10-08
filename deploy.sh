#!/bin/bash

# Dr. Desai Website Deployment Script for Render.com

echo "🚀 Starting Dr. Desai Website Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Build the frontend
echo "🏗️ Building frontend for production..."
npm run build:production

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Go to render.com and create a new Web Service"
echo "3. Connect your GitHub repository"
echo "4. Use the configuration from deploy-to-render.md"
echo ""
echo "🎉 Your website is ready for deployment!"
