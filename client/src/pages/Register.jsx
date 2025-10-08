import React, { useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress
} from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { FaAlignCenter } from 'react-icons/fa'

const gradientBackground = {
  backgroundImage: "url('https://media.gettyimages.com/id/1877240732/vector/abstract-blue-and-white-gradient-wave-overlap-layer-background-with-geometric-shape-element.jpg?s=612x612&w=0&k=20&c=BrNBicRk0E1Xx3Qta1mZOmbUg7QZMFrxFIv-sN3sZtM=')",
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  minHeight: '100vh',
  zIndex: 0,
  filter: 'brightness(0.9)'
}

const cardStyles = {
  borderRadius: 10,
  boxShadow: '0 10px 35px rgba(33, 150, 243, 0.15)',
  backgroundColor: 'linear-gradient(145deg, rgba(255,255,255,0.6), rgba(255,255,255,0.2))',
  width: '100%',
  maxWidth: 600,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',

}

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    phone: '',
    specialization: '',
    licenseNumber: '',
    experience: '',
    age: '',
    gender: '',
    address: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    else if (!formData.email) newErrors.email = 'Email is invalid'

    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match'

    if (!formData.phone) newErrors.phone = 'Phone number is required'

    if (formData.role === 'doctor') {
      if (!formData.specialization) newErrors.specialization = 'Specialization is required'
      if (!formData.licenseNumber) newErrors.licenseNumber = 'License number is required'
      if (!formData.experience) newErrors.experience = 'Experience is required'
    } else if (formData.role === 'patient') {
      if (!formData.age) newErrors.age = 'Age is required'
      else if (isNaN(formData.age) || formData.age < 1 || formData.age > 120)
        newErrors.age = 'Age must be between 1 and 120'
      if (!formData.gender) newErrors.gender = 'Gender is required'
      if (!formData.address) newErrors.address = 'Address is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    try {
      const submitData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        phone: formData.phone
      }
      if (formData.role === 'doctor') {
        submitData.specialization = formData.specialization
        submitData.licenseNumber = formData.licenseNumber
        submitData.experience = parseInt(formData.experience)
      } else if (formData.role === 'patient') {
        submitData.age = parseInt(formData.age)
        submitData.gender = formData.gender
        submitData.address = formData.address
        submitData.emergencyContact = formData.emergencyContact
      }
      const result = await register(submitData)
      if (result.success) {
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box sx={gradientBackground} />
      <Container component="main" maxWidth="md" sx={{ position: 'relative', zIndex: 1, pt: 8, pb: 10, minHeight: '100vh' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Paper sx={cardStyles} elevation={6}>
            <Box sx={{ p: { xs: 3, sm: 5 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" color="primary" sx={{ mb: 2, fontWeight: 800, letterSpacing: '.06em' }}>
                Create Account
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        labelId="role-label"
                        name="role"
                        value={formData.role}
                        label="Role"
                        onChange={handleChange}
                        size="medium"
                      >
                        <MenuItem value="patient">Patient</MenuItem>
                        <MenuItem value="doctor">Doctor</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required fullWidth label="Full Name" name="name" value={formData.name}
                      onChange={handleChange} error={!!errors.name} helperText={errors.name}
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required fullWidth label="Email Address" name="email" type="email" value={formData.email}
                      onChange={handleChange}  helperText={errors.email}
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required fullWidth label="Password" name="password" type="password" value={formData.password}
                      onChange={handleChange} error={!!errors.password} helperText={errors.password}
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required fullWidth label="Confirm Password" name="confirmPassword" type="password"
                      value={formData.confirmPassword} onChange={handleChange}
                      error={!!errors.confirmPassword} helperText={errors.confirmPassword}
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required fullWidth label="Phone Number" name="phone" value={formData.phone}
                      onChange={handleChange} error={!!errors.phone} helperText={errors.phone}
                      size="medium"
                    />
                  </Grid>

                  {formData.role === 'doctor' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required fullWidth label="Specialization" name="specialization" value={formData.specialization}
                          onChange={handleChange} error={!!errors.specialization} helperText={errors.specialization}
                          size="medium"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required fullWidth label="License Number" name="licenseNumber" value={formData.licenseNumber}
                          onChange={handleChange} error={!!errors.licenseNumber} helperText={errors.licenseNumber}
                          size="medium"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required fullWidth label="Years of Experience" name="experience" type="number"
                          value={formData.experience} onChange={handleChange}
                          error={!!errors.experience} helperText={errors.experience}
                          size="medium"
                        />
                      </Grid>
                    </>
                  )}

                  {formData.role === 'patient' && (
                    <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required fullWidth label="Age" name="age" type="number" value={formData.age}
                          onChange={handleChange} error={!!errors.age} helperText={errors.age}
                          size="medium"
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="medium" required error={!!errors.gender}>
                          <InputLabel id="gender-label">Gender</InputLabel>
                          <Select
                            labelId="gender-label"
                            name="gender"
                            value={formData.gender}
                            label="Gender"
                            onChange={handleChange}
                          >
                            <MenuItem value="male">Male</MenuItem>
                            <MenuItem value="female">Female</MenuItem>
                            <MenuItem value="other">Other</MenuItem>
                          </Select>
                          {errors.gender && (
                            <Typography variant="caption" color="error" sx={{ ml: 1, mt: 0.3 }}>
                              {errors.gender}
                            </Typography>
                          )}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required fullWidth multiline rows={2} label="Address" name="address" value={formData.address}
                          onChange={handleChange} error={!!errors.address} helperText={errors.address}
                          size="medium"
                        />
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      sx={{ fontWeight: 700, letterSpacing: '.07em', borderRadius: 3 }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                    </Button>
                  </Grid>

                  <Grid item xs={12} textAlign="center" sx={{ mt: 1 }}>
                    <Link component={RouterLink} to="/login" variant="body2" color="primary" underline="hover">
                      Already have an account? Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </>
  )
}

export default Register
