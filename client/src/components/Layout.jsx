// Layout.js (Sky Blue Theme)
import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard,
  Event,
  Person,
  LocalHospital,
  MonitorHeart,
  BookOnline,
  Logout,
  AccountCircle,
  EmojiEvents
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const drawerWidth = 240

// Unified sky-blue shade map for different pages
const pageShades = {
  '/dashboard': 'linear-gradient(135deg, #0284C7, #0EA5E9)', // medium sky blue
  '/appointments': 'linear-gradient(135deg, #0EA5E9, #0284C7)', // reversed
  '/book-appointment': 'linear-gradient(135deg, #38BDF8, #0EA5E9)', // lighter sky blue
  '/medical-records': 'linear-gradient(135deg, #0284C7, #38BDF8)',
  '/vitals': 'linear-gradient(135deg, #0EA5E9, #38BDF8)',
  '/success-stories': 'linear-gradient(135deg, #38BDF8, #0284C7)',
  '/profile': 'linear-gradient(135deg, #38BDF8, #0284C7)',
}

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const currentStyle = pageShades[location.pathname] || 'linear-gradient(135deg, #0EA5E9, #0284C7)'

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen)
  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget)
  const handleProfileMenuClose = () => setAnchorEl(null)
  const handleLogout = () => {
    logout()
    handleProfileMenuClose()
    navigate('/login')
  }

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Appointments', icon: <Event />, path: '/appointments' },
    ...(user?.role === 'patient' ? [{ text: 'Book Appointment', icon: <BookOnline />, path: '/book-appointment' }] : []),
    { text: 'Medical Records', icon: <LocalHospital />, path: '/medical-records' },
    ...(user?.role === 'patient' ? [{ text: 'My Vitals', icon: <MonitorHeart />, path: '/vitals' }] : []),
    { text: 'Success Stories', icon: <EmojiEvents />, path: '/success-stories' },
    { text: 'Profile', icon: <Person />, path: '/profile' }
  ]

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: '#0284C7', fontWeight: 600 }}>
          Dr. Desai
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path)
                setMobileOpen(false)
              }}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(14,165,233,0.15)',
                  borderLeft: '4px solid #0EA5E9',
                }
              }}
            >
              <ListItemIcon sx={{ color: location.pathname === item.path ? '#0EA5E9' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* AppBar with consistent sky-blue shades */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: currentStyle,
          color: '#fff',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'Dr. Desai Appointment System'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 2 }}>
              {user?.name}
            </Typography>
            <IconButton onClick={handleProfileMenuOpen} color="inherit">
              <Avatar sx={{ width: 32, height: 32 }}>
                <AccountCircle />
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content with Smooth Animation */}
      <Box component="main" sx={{ 
        flexGrow: 1, 
        p: { xs: 1, sm: 2, md: 3 }, 
        width: { sm: `calc(100% - ${drawerWidth}px)` }, 
        background: '#ffffff', 
        minHeight: '100vh',
        overflowX: 'hidden'
      }}>
        <Toolbar />
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <Outlet />
        </motion.div>
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
          <Person fontSize="small" sx={{ mr: 1 }} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Logout fontSize="small" sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Layout
