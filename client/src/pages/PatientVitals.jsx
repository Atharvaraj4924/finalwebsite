import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ScaleIcon from '@mui/icons-material/Scale'
import HeightIcon from '@mui/icons-material/Height'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import { useAuth } from '../context/AuthContext'
import { useSnackbar } from 'notistack'
import api from '../services/api'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

const pageBg = {
  background: 'linear-gradient(135deg, #e3f2fd 0%, #e0f7fa 80%)',
  minHeight: '100vh',
  width: '100vw',
  position: 'fixed',
  left: 0,
  top: 0,
  zIndex: 0
}

const cardShadow = {
  borderRadius: 6,
  boxShadow: '0 8px 32px 0 #00b8d455',
  background: 'rgba(255,255,255,0.97)'
}

const PatientVitals = () => {
  const { user } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    heartRate: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    temperature: ''
  })

  const userId = user?._id // ✅ use _id instead of id

  // Fetch vitals history
  const { data: vitalsHistory, isLoading } = useQuery(
    ['vitals-history', userId],
    () => api.get(`/medical-records/vitals/${userId}`).then(res => res.data),
    { enabled: !!userId }
  )

  // Compute last values for quick summary
  const latestVitals =
    Array.isArray(vitalsHistory) && vitalsHistory.length > 0
      ? vitalsHistory[0].vitals
      : {}

  // Update vitals mutation
  const updateVitalsMutation = useMutation(
    (data) => api.put(`/medical-records/vitals/${userId}`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['vitals-history', userId])
        enqueueSnackbar('Vitals updated successfully!', { variant: 'success' })
        setFormData({
          weight: '',
          height: '',
          heartRate: '',
          bloodPressureSystolic: '',
          bloodPressureDiastolic: '',
          temperature: ''
        })
      },
      onError: (error) => {
        enqueueSnackbar(
          error.response?.data?.message || 'Failed to update vitals',
          { variant: 'error' }
        )
      }
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const vitalsData = {}
    if (formData.weight.trim() !== '') {
      vitalsData.weight = parseFloat(formData.weight)
    }
    if (formData.height.trim() !== '') {
      vitalsData.height = parseFloat(formData.height)
    }
    if (formData.heartRate.trim() !== '') {
      vitalsData.heartRate = parseInt(formData.heartRate)
    }
    if (
      formData.bloodPressureSystolic.trim() !== '' &&
      formData.bloodPressureDiastolic.trim() !== ''
    ) {
      vitalsData.bloodPressure = {
        systolic: parseInt(formData.bloodPressureSystolic),
        diastolic: parseInt(formData.bloodPressureDiastolic)
      }
    }
    if (formData.temperature.trim() !== '') {
      vitalsData.temperature = parseFloat(formData.temperature)
    }

    if (Object.keys(vitalsData).length === 0) {
      enqueueSnackbar('Please enter at least one vital measurement', {
        variant: 'error'
      })
      return
    }

    updateVitalsMutation.mutate(vitalsData)
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
        zIndex={1}
        position="relative"
      >
        <CircularProgress size={38} color="primary" />
      </Box>
    )
  }

  return (
    <>
      <Box sx={pageBg} />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 1, sm: 3 },
          py: { xs: 3, sm: 4 },
          minHeight: '100vh'
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: '.04em',
              color: 'primary.main',
              mb: 0.4,
              textShadow: '0 10px 20px #64b5f633'
            }}
          >
            My Vitals
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Track and update your health vitals for better insights
          </Typography>
        </motion.div>

        {/* Quick Summary */}
        <Grid container spacing={{ xs: 1, sm: 2 }} sx={{ mb: 2 }}>
          <Grid item xs={6} sm={4} md={2.4}>
            <Card sx={cardShadow}>
              <CardContent sx={{ textAlign: 'center', py: { xs: 1.5, sm: 2 } }}>
                <ScaleIcon sx={{ fontSize: { xs: 28, sm: 32, md: 38 }, color: '#2196f3' }} />
                <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>Weight</Typography>
                <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {latestVitals?.weight?.value
                    ? `${latestVitals.weight.value} kg`
                    : '—'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2.4}>
            <Card sx={cardShadow}>
              <CardContent sx={{ textAlign: 'center', py: { xs: 1.5, sm: 2 } }}>
                <HeightIcon sx={{ fontSize: { xs: 28, sm: 32, md: 38 }, color: '#00bfae' }} />
                <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>Height</Typography>
                <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {latestVitals?.height?.value
                    ? `${latestVitals.height.value} cm`
                    : '—'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2.4}>
            <Card sx={cardShadow}>
              <CardContent sx={{ textAlign: 'center', py: { xs: 1.5, sm: 2 } }}>
                <FavoriteIcon sx={{ fontSize: { xs: 28, sm: 32, md: 38 }, color: '#e53935' }} />
                <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>Heart Rate</Typography>
                <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {latestVitals?.heartRate?.value
                    ? `${latestVitals.heartRate.value} bpm`
                    : '—'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2.4}>
            <Card sx={cardShadow}>
              <CardContent sx={{ textAlign: 'center', py: { xs: 1.5, sm: 2 } }}>
                <ThermostatIcon sx={{ fontSize: { xs: 28, sm: 32, md: 38 }, color: '#fb8c00' }} />
                <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>Temp.</Typography>
                <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {latestVitals?.temperature?.value
                    ? `${latestVitals.temperature.value} °C`
                    : '—'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={2.4}>
            <Card sx={cardShadow}>
              <CardContent sx={{ textAlign: 'center', py: { xs: 1.5, sm: 2 } }}>
                <LocalHospitalIcon sx={{ fontSize: { xs: 28, sm: 32, md: 38 }, color: '#673ab7' }} />
                <Typography variant="subtitle2" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>BP</Typography>
                <Typography variant="h6" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  {latestVitals?.bloodPressure?.systolic
                    ? `${latestVitals.bloodPressure.systolic}/${latestVitals.bloodPressure.diastolic}`
                    : '—'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Update Form */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.38, ease: 'easeOut' }}
            >
              <Card sx={cardShadow}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                    Update Vitals
                  </Typography>
                  <Box component="form" onSubmit={handleSubmit} sx={{ mt: 0 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="weight"
                          label="Weight (kg)"
                          type="number"
                          value={formData.weight}
                          onChange={handleChange}
                          inputProps={{ step: 0.1, min: 0 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="height"
                          label="Height (cm)"
                          type="number"
                          value={formData.height}
                          onChange={handleChange}
                          inputProps={{ min: 0 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="heartRate"
                          label="Heart Rate (bpm)"
                          type="number"
                          value={formData.heartRate}
                          onChange={handleChange}
                          inputProps={{ min: 30, max: 200 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="temperature"
                          label="Temperature (°C)"
                          type="number"
                          value={formData.temperature}
                          onChange={handleChange}
                          inputProps={{ step: 0.1, min: 30, max: 45 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="bloodPressureSystolic"
                          label="Blood Pressure - Systolic"
                          type="number"
                          value={formData.bloodPressureSystolic}
                          onChange={handleChange}
                          inputProps={{ min: 10, max: 2000 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="bloodPressureDiastolic"
                          label="Blood Pressure - Diastolic"
                          type="number"
                          value={formData.bloodPressureDiastolic}
                          onChange={handleChange}
                          inputProps={{ min: 40, max: 130 }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          fullWidth
                          size="large"
                          sx={{
                            fontWeight: 700,
                            letterSpacing: '.07em',
                            borderRadius: 2
                          }}
                          disabled={updateVitalsMutation.isLoading}
                        >
                          {updateVitalsMutation.isLoading ? (
                            <CircularProgress size={20} />
                          ) : (
                            'Update Vitals'
                          )}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Vitals History */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.26, duration: 0.39, ease: 'easeOut' }}
            >
              <Card sx={cardShadow}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                    Vitals History
                  </Typography>
                  {Array.isArray(vitalsHistory) && vitalsHistory.length > 0 ? (
                    <TableContainer
                      component={Paper}
                      variant="outlined"
                      sx={{ 
                        borderRadius: 2,
                        overflowX: 'auto',
                        '&::-webkit-scrollbar': {
                          height: 8,
                        },
                        '&::-webkit-scrollbar-track': {
                          backgroundColor: '#f1f1f1',
                          borderRadius: 4,
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: '#c1c1c1',
                          borderRadius: 4,
                          '&:hover': {
                            backgroundColor: '#a8a8a8',
                          },
                        },
                      }}
                    >
                      <Table size="small" sx={{ minWidth: 400 }}>
                        <TableHead>
                          <TableRow>
                            <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Date</TableCell>
                            <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Weight</TableCell>
                            <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Height</TableCell>
                            <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Heart Rate</TableCell>
                            <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>BP</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {vitalsHistory.slice(0, 10).map((record, index) => (
                            <TableRow key={index}>
                              <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                                {format(new Date(record.createdAt), 'MMM dd')}
                              </TableCell>
                              <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                                {record.vitals?.weight?.value
                                  ? `${record.vitals.weight.value} kg`
                                  : '—'}
                              </TableCell>
                              <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                                {record.vitals?.height?.value
                                  ? `${record.vitals.height.value} cm`
                                  : '—'}
                              </TableCell>
                              <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                                {record.vitals?.heartRate?.value
                                  ? `${record.vitals.heartRate.value} bpm`
                                  : '—'}
                              </TableCell>
                              <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                                {record.vitals?.bloodPressure?.systolic
                                  ? `${record.vitals.bloodPressure.systolic}/${record.vitals.bloodPressure.diastolic}`
                                  : '—'}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      sx={{ my: 4 }}
                    >
                      No vitals history found. <br /> Start recording to see your
                      health trends!
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default PatientVitals
