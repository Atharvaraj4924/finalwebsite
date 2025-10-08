import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  CircularProgress,
  TextField,
  Button,
} from '@mui/material'
import {
  Event,
  Person,
  LocalHospital,
  Schedule,
  CheckCircle,
  Cancel,
  Pending,
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import img from './image.png'

const animatedCardStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: '#fff',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-6px) scale(1.02)',
    boxShadow: `0px 8px 25px ${bgColor}88`,
  },
  '&:active': {
    transform: 'scale(0.98)',
    boxShadow: `0px 4px 15px ${bgColor}cc`,
  },
})

const Dashboard = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [visitorCount, setVisitorCount] = useState('192915+')

  // Fetch appointments
  const { data: appointmentsData, isLoading: appointmentsLoading } = useQuery(
    ['appointments'],
    () => api.get('/appointments').then(res => res.data),
    { refetchInterval: 30000 }
  )

  // Fetch medical records (for doctors)
  const { data: medicalRecordsData } = useQuery(
    ['medical-records'],
    () => api.get('/medical-records').then(res => res.data),
    { enabled: user?.role === 'doctor', refetchInterval: 60000 }
  )

  // Visitor count
  useEffect(() => {
    const fetchVisitorCount = async () => {
      const res = await api.get('/visitor-count')
      setVisitorCount(res.data.count)
    }
    fetchVisitorCount()
    const interval = setInterval(fetchVisitorCount, 10000)
    return () => clearInterval(interval)
  }, [])

  const appointments = appointmentsData?.appointments || []
  const medicalRecords = medicalRecordsData?.medicalRecords || []

  // Stats
  const totalAppointments = appointments.length
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length
  const completedAppointments = appointments.filter(a => a.status === 'completed').length

  // Upcoming
  const upcomingAppointments = appointments
    .filter(a => a.status === 'accepted' || a.status === 'pending')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5)

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning'
      case 'accepted': return 'info'
      case 'completed': return 'success'
      case 'cancelled': return 'error'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Pending />
      case 'accepted': return <Schedule />
      case 'completed': return <CheckCircle />
      case 'cancelled': return <Cancel />
      default: return <Event />
    }
  }

  if (appointmentsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#ffffff',
        p: 3,
      }}
    >
      {/* Visitor Count Bar */}
      <Box
        sx={{
          width: '100%',
          bgcolor: 'primary.main',
          color: '#fff',
          textAlign: 'center',
          py: 1,
          mb: 2,
          borderRadius: 1,
          fontWeight: 'bold',
        }}
      >
        Website Visitors: {visitorCount}
      </Box>

      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {user?.role === 'doctor'
            ? 'Manage your patients and appointments'
            : 'Track your health and appointments'}
        </Typography>
      </motion.div>

      {/* Animated Statistic Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        <Grid item xs={6} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card sx={animatedCardStyle('#1976d2')}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ 
                    bgcolor: '#1565c0', 
                    mr: { xs: 1.5, sm: 2 },
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 }
                  }}>
                    <Event sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                      {totalAppointments}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Total Appointments
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card sx={animatedCardStyle('#f57c00')}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ 
                    bgcolor: '#ef6c00', 
                    mr: { xs: 1.5, sm: 2 },
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 }
                  }}>
                    <Pending sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                      {pendingAppointments}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Pending
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card sx={animatedCardStyle('#2e7d32')}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ 
                    bgcolor: '#1b5e20', 
                    mr: { xs: 1.5, sm: 2 },
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 }
                  }}>
                    <CheckCircle sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                      {completedAppointments}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Completed
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={6} sm={6} md={3}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <Card sx={animatedCardStyle('#0288d1')}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ 
                    bgcolor: '#01579b', 
                    mr: { xs: 1.5, sm: 2 },
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 }
                  }}>
                    <LocalHospital sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                      {medicalRecords.length}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      {user?.role === 'doctor' ? 'Medical Records' : 'Health Records'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Upcoming Appointments & Quick Actions */}
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {/* Upcoming Appointments */}
        <Grid item xs={12} md={8}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Upcoming Appointments</Typography>
                {upcomingAppointments.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">No upcoming appointments</Typography>
                ) : (
                  <List>
                    {upcomingAppointments.map((apt, idx) => (
                      <React.Fragment key={apt._id}>
                        <ListItem
                          sx={{
                            transition: '0.3s',
                            '&:hover': {
                              bgcolor: 'action.hover',
                              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>{getStatusIcon(apt.status)}</Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box display="flex" justifyContent="space-between">
                                <Typography variant="subtitle1">
                                  {user?.role === 'doctor' ? apt.patient?.name : apt.doctor?.name}
                                </Typography>
                                <Chip label={apt.status} color={getStatusColor(apt.status)} size="small" />
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  {format(new Date(apt.date), 'MMM dd, yyyy')} at {apt.time}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">{apt.reason}</Typography>
                              </Box>
                            }
                          />
                        </ListItem>
                        {idx < upcomingAppointments.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </List>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Quick Actions</Typography>
                <List>
                  {user?.role === 'patient' && (
                    <ListItem
                      button
                      onClick={() => navigate('/book-appointment')}
                      sx={{
                        transition: '0.3s',
                        '&:hover': {
                          bgcolor: '#1976d21a',
                          boxShadow: '0px 4px 15px rgba(25, 118, 210, 0.4)',
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}><Event /></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Book Appointment" secondary="Schedule a new appointment" />
                    </ListItem>
                  )}

                  <ListItem
                    button
                    onClick={() => navigate('/profile')}
                    sx={{
                      transition: '0.3s',
                      '&:hover': {
                        bgcolor: '#0288d11a',
                        boxShadow: '0px 4px 15px rgba(2, 136, 209, 0.4)',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'info.main' }}><Person /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="View Profile" secondary="Update your information" />
                  </ListItem>

                  <ListItem
                    button
                    onClick={() => navigate('/medical-records')}
                    sx={{
                      transition: '0.3s',
                      '&:hover': {
                        bgcolor: '#2e7d321a',
                        boxShadow: '0px 4px 15px rgba(46, 125, 50, 0.4)',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'success.main' }}><LocalHospital /></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Medical Records" secondary="View health information" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Single Doctor Card (only for patients) */}
      {user?.role === 'patient' && (
        <Box sx={{ mt: 4 }}>
          <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  src={img}
                  sx={{ width: 80, height: 80, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">Dr. Santosh Desai</Typography>
                  <Typography variant="body2" color="text.secondary">
                   BHMS CCH
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    25+ years of experience
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle2" gutterBottom>Contact Information:</Typography>
              <Typography variant="body2"><strong>Email:</strong> santoshdesai43@gmail.com</Typography>
              <Typography variant="body2"><strong>Phone:</strong> +91 9822064718</Typography>
              <Typography variant="body2"><strong>Clinic:</strong> Shreevidya and Shreeya  Clinic, Plaus</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Dr. Santosh Desai is an experienced Homepathy practiotcetner for last 25+ years and cured many patients .
                He focuses on personalized treatment and patient education.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
            {user?.role === 'patient' && (
        <Box sx={{ mt: 4 }}>
          <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQWUjJBF3-HVIQD4wMf392fE8Lz3HaOE__Tg&s"}
                  sx={{ width: 80, height: 80, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">Dr. Rohini Desai</Typography>
                  <Typography variant="body2" color="text.secondary">
                   BHMS MD Hom
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    25+ years of experience
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle2" gutterBottom>Contact Information:</Typography>
              <Typography variant="body2"><strong>Email:</strong> santoshdesai43@gmail.com</Typography>
              <Typography variant="body2"><strong>Phone:</strong> +91 9822064718</Typography>
              <Typography variant="body2"><strong>Clinic:</strong> Shreevidya and Shreeya  Clinic, Plaus</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Dr. Rohini Desai is an experienced Homepathy practiotcetner for last 25+ years and cured many patients .
                He focuses on personalized treatment and patient education.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Contact Us Section */}
      <Box sx={{ mt: { xs: 3, sm: 4 } }}>
        <Card>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              Contact Us
            </Typography>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth 
                  label="Name" 
                  variant="outlined" 
                  size={window.innerWidth < 600 ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth 
                  label="Email" 
                  variant="outlined" 
                  size={window.innerWidth < 600 ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  fullWidth 
                  label="Message" 
                  variant="outlined" 
                  multiline 
                  rows={window.innerWidth < 600 ? 3 : 4}
                  size={window.innerWidth < 600 ? "small" : "medium"}
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  color="primary"
                  size={window.innerWidth < 600 ? "medium" : "large"}
                  sx={{ 
                    width: { xs: '100%', sm: 'auto' },
                    px: { xs: 3, sm: 4 }
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default Dashboard
