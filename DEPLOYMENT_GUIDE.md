# Dr. Desai Website - Hostinger Deployment Guide

## 🚀 Files to Upload to Hostinger

### 1. Frontend Files (React Build)
Upload the entire `client/dist/` folder contents to your domain's `public_html` folder:

**Files to upload:**
- `client/dist/index.html`
- `client/dist/assets/` (entire folder with all files)

### 2. Backend Files (Node.js Server)
Upload the entire `server/` folder to your hosting account:

**Files to upload:**
- `server/server.js`
- `server/package.json`
- `server/package-lock.json`
- `server/config/` (entire folder)
- `server/controllers/` (entire folder)
- `server/middleware/` (entire folder)
- `server/models/` (entire folder)
- `server/routes/` (entire folder)

## 📁 Recommended Folder Structure on Hostinger

```
public_html/
├── index.html (from client/dist/)
├── assets/ (from client/dist/assets/)
└── server/ (entire server folder)
    ├── server.js
    ├── package.json
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    └── .env (create this file)
```

## ⚙️ Environment Configuration

### 1. Create `.env` file in the server folder with:

```env
# Production Environment Variables
NODE_ENV=production
PORT=3000

# MongoDB Atlas Connection (Replace with your actual connection string)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/drdesai?retryWrites=true&w=majority

# JWT Secret (Generate a strong secret)
JWT_SECRET=your_super_strong_jwt_secret_here_at_least_32_characters_long

# CORS Origins
CORS_ORIGIN=https://drdesaipalus.com,https://www.drdesaipalus.com
```

### 2. Update MongoDB Atlas:
- Add your Hostinger server IP to MongoDB Atlas IP whitelist
- Or use `0.0.0.0/0` for all IPs (less secure but easier)

## 🔧 Hostinger Configuration Steps

### 1. Upload Files
1. Login to your Hostinger control panel
2. Go to File Manager
3. Navigate to `public_html`
4. Upload the `client/dist/` contents to root
5. Create a `server` folder and upload server files

### 2. Install Node.js Dependencies
1. In Hostinger control panel, go to "Node.js" section
2. Create a new Node.js application
3. Set the application path to `/server`
4. Set the startup file to `server.js`
5. Install dependencies by running: `npm install`

### 3. Environment Variables
1. In the Node.js application settings
2. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `MONGODB_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_jwt_secret`

### 4. Start the Application
1. Start the Node.js application
2. Your website should be accessible at `https://drdesaipalus.com`

## 🔒 Security Checklist

- [ ] Use strong JWT secret (at least 32 characters)
- [ ] Update MongoDB Atlas IP whitelist
- [ ] Enable HTTPS (should be automatic with Hostinger)
- [ ] Set up proper CORS origins
- [ ] Use environment variables for sensitive data

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure CORS_ORIGIN includes your domain
2. **MongoDB Connection**: Check connection string and IP whitelist
3. **404 Errors**: Ensure static files are in the correct location
4. **Port Issues**: Make sure PORT environment variable is set

### Debug Steps:
1. Check Node.js application logs in Hostinger
2. Test API endpoints: `https://drdesaipalus.com/api/health`
3. Check browser console for errors
4. Verify environment variables are set correctly

## 📞 Support

If you encounter issues:
1. Check Hostinger Node.js application logs
2. Verify all environment variables are set
3. Test MongoDB connection
4. Check browser console for frontend errors

## 🎉 Post-Deployment

After successful deployment:
1. Test all major features (login, registration, appointments)
2. Check mobile responsiveness
3. Test on different browsers
4. Set up regular backups
5. Monitor application performance

---

**Note**: Make sure to replace placeholder values (like MongoDB connection string and JWT secret) with your actual production values before deployment.
