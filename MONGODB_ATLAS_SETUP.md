# 🗄️ MongoDB Atlas Setup for Dr. Desai Website

## Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Choose the **FREE** M0 Sandbox cluster

## Step 2: Create Cluster

1. **Choose Cloud Provider**: AWS (recommended)
2. **Choose Region**: Select closest to your users
3. **Cluster Name**: `dr-desai-cluster`
4. Click "Create Cluster"

## Step 3: Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. **Authentication Method**: Password
4. **Username**: `drdesai-user`
5. **Password**: Generate a strong password (save it!)
6. **Database User Privileges**: "Read and write to any database"
7. Click "Add User"

## Step 4: Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. **Add Current IP Address**: Click to add your current IP
4. **For Production**: Add `0.0.0.0/0` to allow all IPs (less secure but easier)
5. Click "Confirm"

## Step 5: Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. **Driver**: Node.js
5. **Version**: 4.1 or later
6. Copy the connection string

## Step 6: Update Connection String

Replace the connection string with your actual credentials:

```
mongodb+srv://drdesai-user:<password>@dr-desai-cluster.xxxxx.mongodb.net/drdesai?retryWrites=true&w=majority
```

**Replace:**
- `<password>` with your actual password
- `drdesai` with your database name

## Step 7: Environment Variables

Add this to your Render.com environment variables:

```
MONGODB_URI=mongodb+srv://drdesai-user:your_password@dr-desai-cluster.xxxxx.mongodb.net/drdesai?retryWrites=true&w=majority
```

## Step 8: Create Database and Collections

Your application will automatically create the following collections:
- `users` - Patient and doctor accounts
- `appointments` - Appointment bookings
- `medicalrecords` - Medical records and vitals

## 🔒 Security Best Practices

1. **Use Strong Passwords**: Generate complex passwords for database users
2. **IP Whitelist**: Only allow necessary IP addresses
3. **Regular Backups**: Enable automatic backups
4. **Monitor Access**: Check connection logs regularly

## 🆓 Free Tier Limits

- **Storage**: 512 MB
- **Connections**: 100 concurrent connections
- **Perfect for**: Small to medium applications

## 🐛 Troubleshooting

### Connection Issues:
1. Check IP whitelist includes your server IP
2. Verify username and password are correct
3. Ensure database name is correct
4. Check network connectivity

### Common Errors:
- `MongoNetworkError`: Check IP whitelist
- `Authentication failed`: Verify credentials
- `Database not found`: Database will be created automatically

---

**Your MongoDB Atlas database is now ready for production!** 🎉