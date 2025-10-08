import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
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
  CircularProgress
} from '@mui/material'
import { useSnackbar } from 'notistack'
import api from '../services/api'
import { motion } from 'framer-motion'

// Generate time slots from 9:00 AM to 8:00 PM
const generateTimeSlots = (start = '09:00', end = '20:00', interval = 30) => {
  const pad = (n) => n.toString().padStart(2, '0')
  const [startH, startM] = start.split(':').map(Number)
  const [endH, endM] = end.split(':').map(Number)
  const slots = []
  let h = startH
  let m = startM
  while (h < endH || (h === endH && m <= endM)) {
    const ampm = h >= 12 ? 'PM' : 'AM'
    const displayH = h % 12 === 0 ? 12 : h % 12
    slots.push(`${pad(displayH)}:${pad(m)} ${ampm}`)
    m += interval
    if (m >= 60) {
      m -= 60
      h += 1
    }
  }
  return slots
}
const timeSlots = generateTimeSlots()

const gradientBg = {
  background: 'linear-gradient(135deg, #e3f2fd, #e0f7fa 80%)',
  minHeight: '100vh',
  width: '100vw',
  position: 'fixed',
  left: 0, top: 0, zIndex: 0
}
const cardShadow = {
  borderRadius: 6,
  boxShadow: '0 8px 30px 1px #64b5f6aa',
  backdropFilter: 'blur(1.5px)'
}

const BookAppointment = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    reason: '',
    symptoms: '',
    mode: 'offline'
  })

  // Fetch available doctors
  const { data: doctors, isLoading: doctorsLoading } = useQuery(
    ['doctors'],
    () => api.get('/appointments/doctors').then(res => res.data)
  )

  // Book appointment mutation
  const bookMutation = useMutation(
    (data) => api.post('/appointments', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['appointments'])
        enqueueSnackbar('Appointment booked successfully!', { variant: 'success' })
        navigate('/appointments')
      },
      onError: (error) => {
        enqueueSnackbar(error.response?.data?.message || 'Failed to book appointment', { variant: 'error' })
      }
    }
  )

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    bookMutation.mutate(formData)
  }

  return (
    <>
      <Box sx={gradientBg} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        zIndex={1}
        position="relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.67, ease: 'easeOut' }}
        >
          <Box sx={{ maxWidth: 560, width: '100%' }}>
            <Typography
              variant="h4"
              sx={{
                mb: 0.6, fontWeight: 800,
                letterSpacing: '.04em',
                color: 'primary.main',
                textShadow: '0 4px 16px #81d4fa40'
              }}
            >
              Book Appointment
            </Typography>
            {/* <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Schedule your visit with one of our trusted doctors
            </Typography> */}
            <Card sx={{ ...cardShadow, mt: 2 }}>
              <CardContent>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ mt: 1, width: '100%' }}
                >
                  <Grid container spacing={3}>
                    {/* Select Doctor */}
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel>Select Doctor</InputLabel>
                        <Select
                          name="doctorId"
                          value={formData.doctorId}
                          label="Select Doctor"
                          onChange={handleChange}
                          required
                          MenuProps={{
                            PaperProps: { style: { maxHeight: 300 } }
                          }}
                        >
                          {doctorsLoading ? (
                            <MenuItem disabled>
                              <CircularProgress size={20} />
                            </MenuItem>
                          ) : (
                            doctors?.map((doctor) => (
                              <MenuItem key={doctor._id} value={doctor._id}>
                                Dr. {doctor.name} – {doctor.specialization}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* Appointment Date */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        type="date"
                        name="date"
                        label="Appointment Date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ min: new Date().toISOString().split('T')[0] }}
                      />
                    </Grid>
                    {/* Time Slot */}
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Time Slot</InputLabel>
                        <Select
                          name="time"
                          value={formData.time}
                          label="Time Slot"
                          onChange={handleChange}
                          required
                          MenuProps={{
                            PaperProps: { style: { maxHeight: 380 } }
                          }}
                        >
                          {timeSlots.map((time) => (
                            <MenuItem key={time} value={time}>
                              {time}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* Mode Online / Offline */}
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Mode</InputLabel>
                        <Select
                          name="mode"
                          value={formData.mode}
                          label="Mode"
                          onChange={handleChange}
                          required
                        >
                          <MenuItem value="offline">Offline</MenuItem>
                          <MenuItem value="online">Online</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {/* Reason */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        name="reason"
                        label="Reason for Appointmet"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                        placeholder="Describe your symptoms or reason for the appointment…"
                        sx={{
                          '& textarea': { fontSize: 17 }
                        }}
                      />
                    </Grid>
                    {/* Symptoms */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        name="symptoms"
                        label="Symptoms (Optional)"
                        value={formData.symptoms}
                        onChange={handleChange}
                        placeholder="List any symptoms you’re experiencing…"
                        sx={{
                          '& textarea': { fontSize: 17 }
                        }}
                      />
                    </Grid>
                    {/* Action Buttons */}
                    <Grid item xs={12}>
                      <Box display="flex" gap={2} justifyContent="flex-end">
                        <Button
                          variant="outlined"
                          size="large"
                          onClick={() => navigate('/appointments')}
                          sx={{
                            borderRadius: 2,
                            fontWeight: 600
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          disabled={bookMutation.isLoading}
                          sx={{
                            borderRadius: 2,
                            fontWeight: 600,
                            boxShadow: '0 2px 10px #64b5f66c'
                          }}
                        >
                          {bookMutation.isLoading ?
                            <CircularProgress size={21} color="inherit" /> :
                            'Book Appointment'
                          }
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </motion.div>
      </Box>
    </>
  )
}

export default BookAppointment
