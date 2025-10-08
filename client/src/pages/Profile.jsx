import React, { useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  CircularProgress
} from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { useSnackbar } from 'notistack'
import { motion } from 'framer-motion'

const gradientBackground = {
  background: 'linear-gradient(135deg, #e3f2fd 0%, #e0f7fa 80%)',
  minHeight: '100vh',
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 0
}

const cardElevation = {
  borderRadius: 8,
  boxShadow: '0 10px 30px 0 rgba(33, 150, 243, 0.15)',
  backgroundColor: 'rgba(255,255,255,0.98)'
}

const Profile = () => {
  const { user, updateProfile } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    specialization: user?.specialization || '',
    licenseNumber: user?.licenseNumber || '',
    experience: user?.experience || '',
    age: user?.age || '',
    gender: user?.gender || '',
    address: user?.address || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await updateProfile(formData)
      if (result.success) {
        enqueueSnackbar('Profile updated successfully!', { variant: 'success' })
      }
    } catch (error) {
      enqueueSnackbar('Failed to update profile. Please try again.', { variant: 'error' })
      console.error('Profile update error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box sx={gradientBackground} />
      <Box sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 4 }, pt: 5, pb: 8, minHeight: '100vh' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, mb: 1, color: 'primary.main', letterSpacing: '.04em', textShadow: '0 6px 16px #64b5f333' }}
          >
            Profile
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Update your personal information and preferences
          </Typography>

          <Card sx={cardElevation} elevation={6}>
            <CardContent>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      size="medium"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="phone"
                      label="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                      size="medium"
                    />
                  </Grid>

                  {user?.role === 'doctor' && (
                    <>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="specialization"
                          label="Specialization"
                          value={formData.specialization}
                          onChange={handleChange}
                          required
                          size="medium"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="licenseNumber"
                          label="License Number"
                          value={formData.licenseNumber}
                          onChange={handleChange}
                          required
                          size="medium"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="experience"
                          label="Years of Experience"
                          type="number"
                          value={formData.experience}
                          onChange={handleChange}
                          required
                          inputProps={{ min: 0 }}
                          size="medium"
                        />
                      </Grid>
                    </>
                  )}

                  {user?.role === 'patient' && (
                    <>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="age"
                          label="Age"
                          type="number"
                          value={formData.age}
                          onChange={handleChange}
                          required
                          inputProps={{ min: 0 }}
                          size="medium"
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth size="medium" required>
                          <InputLabel>Gender</InputLabel>
                          <Select
                            name="gender"
                            value={formData.gender}
                            label="Gender"
                            onChange={handleChange}
                          >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          multiline
                          rows={3}
                          name="address"
                          label="Address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          size="medium"
                        />
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Box display="flex" justifyContent="flex-end" gap={2}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        size="large"
                        sx={{ fontWeight: 700, letterSpacing: '.07em', borderRadius: 2, px: 5 }}
                      >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Update Profile"}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </>
  )
}

export default Profile
