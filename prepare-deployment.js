#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Dr. Desai Website for Hostinger Deployment...\n');

// Create deployment folder
const deploymentDir = path.join(__dirname, 'deployment');
if (!fs.existsSync(deploymentDir)) {
  fs.mkdirSync(deploymentDir);
}

// Create public_html folder for frontend
const publicHtmlDir = path.join(deploymentDir, 'public_html');
if (!fs.existsSync(publicHtmlDir)) {
  fs.mkdirSync(publicHtmlDir);
}

// Create server folder for backend
const serverDir = path.join(deploymentDir, 'server');
if (!fs.existsSync(serverDir)) {
  fs.mkdirSync(serverDir);
}

console.log('✅ Created deployment folder structure');

// Copy frontend build files
const clientDistDir = path.join(__dirname, 'client', 'dist');
if (fs.existsSync(clientDistDir)) {
  copyFolderRecursive(clientDistDir, publicHtmlDir);
  console.log('✅ Copied frontend build files to public_html/');
} else {
  console.log('❌ Frontend build not found. Run "npm run build" in client folder first.');
}

// Copy server files
const serverSourceDir = path.join(__dirname, 'server');
copyFolderRecursive(serverSourceDir, serverDir);
console.log('✅ Copied server files to server/');

// Create .env template
const envTemplate = `# Production Environment Variables for Dr. Desai Website
# Replace the values below with your actual production values

NODE_ENV=production
PORT=3000

# MongoDB Atlas Connection (Replace with your actual connection string)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/drdesai?retryWrites=true&w=majority

# JWT Secret (Generate a strong secret - at least 32 characters)
JWT_SECRET=your_super_strong_jwt_secret_here_at_least_32_characters_long

# CORS Origins
CORS_ORIGIN=https://drdesaipalus.com,https://www.drdesaipalus.com
`;

fs.writeFileSync(path.join(serverDir, '.env'), envTemplate);
console.log('✅ Created .env template file');

// Create deployment instructions
const instructions = `# Hostinger Deployment Instructions

## 📁 Upload These Folders to Hostinger:

### 1. Frontend (public_html folder contents)
Upload everything from the 'public_html' folder to your domain's public_html directory in Hostinger.

### 2. Backend (server folder)
Upload the entire 'server' folder to your hosting account.

## ⚙️ Configuration Steps:

1. **Update .env file** in the server folder with your actual values:
   - MongoDB Atlas connection string
   - Strong JWT secret
   - Your domain name

2. **In Hostinger Control Panel:**
   - Go to Node.js section
   - Create new Node.js application
   - Set path to /server
   - Set startup file to server.js
   - Install dependencies: npm install
   - Start the application

3. **Test your website:**
   - Visit https://drdesaipalus.com
   - Test API: https://drdesaipalus.com/api/health

## 🔒 Security Reminders:
- Use strong JWT secret (32+ characters)
- Update MongoDB Atlas IP whitelist
- Enable HTTPS
- Set proper CORS origins

## 📞 If you need help:
- Check Hostinger Node.js logs
- Verify environment variables
- Test MongoDB connection
- Check browser console for errors

Good luck with your deployment! 🎉
`;

fs.writeFileSync(path.join(deploymentDir, 'DEPLOYMENT_INSTRUCTIONS.txt'), instructions);
console.log('✅ Created deployment instructions');

console.log('\n🎉 Deployment files prepared successfully!');
console.log('\n📁 Check the "deployment" folder for:');
console.log('   - public_html/ (frontend files to upload to domain root)');
console.log('   - server/ (backend files to upload to hosting)');
console.log('   - DEPLOYMENT_INSTRUCTIONS.txt (step-by-step guide)');
console.log('\n📖 Also check DEPLOYMENT_GUIDE.md for detailed instructions');

function copyFolderRecursive(source, target) {
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  const files = fs.readdirSync(source);
  
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const targetPath = path.join(target, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyFolderRecursive(sourcePath, targetPath);
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });
}
