import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress
} from '@mui/material'
import {
  CheckCircle,
  Cancel,
  Schedule,
  Edit,
  Delete,
  Visibility,
  EventBusy,
  AssignmentTurnedIn,
  HourglassEmpty,
  DoneAll
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { useSnackbar } from 'notistack'
import api from '../services/api'
import { format } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

// Glow card style
const animatedCardStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: '#fff',
  borderRadius: '14px',
  transition: 'all 0.3s cubic-bezier(.49,1.74,.41,-0.5)',
  cursor: 'pointer',
  boxShadow: `0px 1px 10px ${bgColor}44`,
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: `0px 8px 22px ${bgColor}99`,
    filter: 'brightness(1.1)'
  }
})

const cardMeta = [
  { label: 'Pending', status: 'pending', icon: HourglassEmpty, color: '#4285F4' },
  { label: 'Accepted', status: 'accepted', icon: AssignmentTurnedIn, color: '#00B8D4' },
  { label: 'Completed', status: 'completed', icon: DoneAll, color: '#43A047' },
  { label: 'Cancelled', status: 'cancelled', icon: EventBusy, color: '#E53935' }
]

const Appointments = () => {
  const { user } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [statusDialog, setStatusDialog] = useState(false)
  const [statusData, setStatusData] = useState({
    status: '',
    notes: '',
    prescription: '',
    followUpDate: ''
  })

  // Fetch appointments
  const { data: appointmentsData, isLoading, isRefetching } = useQuery(
    ['appointments'],
    () => api.get('/appointments').then(res => res.data),
    { refetchInterval: 30000 }
  )

  const appointments = appointmentsData?.appointments || []

  // COUNT appointments for status cards
  const statusCounts = cardMeta.reduce((acc, card) => {
    acc[card.status] = appointments.filter(a => a.status === card.status).length
    return acc
  }, {})

  // Update appointment mutation
  const updateStatusMutation = useMutation(
    (data) => api.put(`/appointments/${data.id}/status`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['appointments'])
        enqueueSnackbar('Appointment status updated!', { variant: 'success' })
        setStatusDialog(false)
        setSelectedAppointment(null)
      },
      onError: (error) => {
        enqueueSnackbar(error.response?.data?.message || 'Failed to update status', { variant: 'error' })
      }
    }
  )

  // Cancel appointment mutation
  const cancelMutation = useMutation(
    (id) => api.delete(`/appointments/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['appointments'])
        enqueueSnackbar('Appointment cancelled.', { variant: 'success' })
      },
      onError: (error) => {
        enqueueSnackbar(error.response?.data?.message || 'Failed to cancel appointment', { variant: 'error' })
      }
    }
  )

  const handleStatusUpdate = (appointment) => {
    setSelectedAppointment(appointment)
    setStatusData({
      status: appointment.status,
      notes: appointment.notes || '',
      prescription: appointment.prescription || '',
      followUpDate: appointment.followUpDate ? format(new Date(appointment.followUpDate), 'yyyy-MM-dd') : ''
    })
    setStatusDialog(true)
  }

  const handleStatusSubmit = () => {
    updateStatusMutation.mutate({
      id: selectedAppointment._id,
      ...statusData
    })
  }

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      cancelMutation.mutate(id)
    }
  }

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
      case 'pending': return <Schedule />
      case 'accepted': return <CheckCircle />
      case 'completed': return <CheckCircle />
      case 'cancelled': return <Cancel />
      default: return <Schedule />
    }
  }

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={40} />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e3f2fd, #e0f7fa)',
        p: 3,
        overflow: 'hidden'
      }}
    >
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>
          Appointments Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Effortlessly manage appointments and stay updated on every step!
        </Typography>
      </motion.div>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {cardMeta.map((meta) => (
          <Grid item xs={12} sm={6} md={3} key={meta.status}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.12 }}>
              <Card sx={animatedCardStyle(meta.color)}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1}>
                    {<meta.icon style={{ fontSize: 28, marginRight: 10 }} />}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>{meta.label}</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ mt: 1, fontWeight: 900, textShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
                    {statusCounts[meta.status] || 0}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Appointments Table or Empty State */}
      {appointments.length === 0 ? (
        <Card sx={{ mx: 'auto', maxWidth: 420, mt: 7, p: 4, textAlign: 'center' }}>
          <motion.div initial={{ scale: 0.8, opacity: 0.5 }} animate={{ scale: 1, opacity: 1 }}>
            <EventBusy sx={{ fontSize: 67, color: '#BDBDBD', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No appointments found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Ready to make your first booking?
            </Typography>
            <Button variant="contained" size="large" color="primary" sx={{ mt: 2 }}>
              Book Now
            </Button>
          </motion.div>
        </Card>
      ) : (
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: '14px', 
            boxShadow: 2,
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
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Date & Time</TableCell>
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{user?.role === 'doctor' ? 'Patient' : 'Doctor'}</TableCell>
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Reason</TableCell>
                <TableCell sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Status</TableCell>
                <TableCell align="center" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <AnimatePresence>
                {appointments.map((appointment) => (
                  <motion.tr
                    key={appointment._id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 18, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.37, ease: 'easeOut' }}
                    whileHover={{ scale: 1.008, boxShadow: '0px 4px 12px #0288D130' }}
                    style={{ display: 'table-row' }}
                  >
                    <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                        {format(new Date(appointment.date), 'MMM dd, yyyy')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
                        {appointment.time}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                        {user?.role === 'doctor' ? appointment.patient?.name : appointment.doctor?.name}
                      </Typography>
                      {user?.role === 'doctor' && (
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' } }}>
                          {appointment.patient?.age} yrs, {appointment.patient?.gender}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                      <Typography variant="body2" noWrap sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                        {appointment.reason}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                      <Chip
                        icon={getStatusIcon(appointment.status)}
                        label={appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        color={getStatusColor(appointment.status)}
                        size="small"
                        sx={{ 
                          fontWeight: 700, 
                          fontSize: { xs: 10, sm: 12 }, 
                          pl: .5,
                          height: { xs: 20, sm: 24 }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                      <Box display="flex" justifyContent="center" gap={{ xs: 0.5, sm: 1 }} flexWrap="wrap">
                        <Tooltip arrow title="View Details">
                          <IconButton 
                            size="small" 
                            color="primary"
                            sx={{ 
                              minWidth: { xs: 28, sm: 32 },
                              height: { xs: 28, sm: 32 },
                              '& .MuiSvgIcon-root': {
                                fontSize: { xs: '1rem', sm: '1.25rem' }
                              }
                            }}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                        {user?.role === 'doctor' && appointment.status === 'pending' && (
                          <>
                            <Tooltip arrow title="Accept this appointment">
                              <IconButton 
                                size="small" 
                                color="success" 
                                onClick={() => handleStatusUpdate({ ...appointment, status: 'accepted' })}
                                sx={{ 
                                  minWidth: { xs: 28, sm: 32 },
                                  height: { xs: 28, sm: 32 },
                                  '& .MuiSvgIcon-root': {
                                    fontSize: { xs: '1rem', sm: '1.25rem' }
                                  }
                                }}
                              >
                                <CheckCircle />
                              </IconButton>
                            </Tooltip>
                            <Tooltip arrow title="Reject this appointment">
                              <IconButton 
                                size="small" 
                                color="error" 
                                onClick={() => handleStatusUpdate({ ...appointment, status: 'cancelled' })}
                                sx={{ 
                                  minWidth: { xs: 28, sm: 32 },
                                  height: { xs: 28, sm: 32 },
                                  '& .MuiSvgIcon-root': {
                                    fontSize: { xs: '1rem', sm: '1.25rem' }
                                  }
                                }}
                              >
                                <Cancel />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                        {appointment.status === 'accepted' && (
                          <Tooltip arrow title="Mark as Completed">
                            <IconButton 
                              size="small" 
                              color="primary" 
                              onClick={() => handleStatusUpdate({ ...appointment, status: 'completed' })}
                              sx={{ 
                                minWidth: { xs: 28, sm: 32 },
                                height: { xs: 28, sm: 32 },
                                '& .MuiSvgIcon-root': {
                                  fontSize: { xs: '1rem', sm: '1.25rem' }
                                }
                              }}
                            >
                              <CheckCircle />
                            </IconButton>
                          </Tooltip>
                        )}
                        {appointment.status === 'pending' && (
                          <Tooltip arrow title="Cancel appointment">
                            <span>
                              <IconButton 
                                size="small" 
                                color="error" 
                                onClick={() => handleCancel(appointment._id)} 
                                disabled={cancelMutation.isLoading}
                                sx={{ 
                                  minWidth: { xs: 28, sm: 32 },
                                  height: { xs: 28, sm: 32 },
                                  '& .MuiSvgIcon-root': {
                                    fontSize: { xs: '1rem', sm: '1.25rem' }
                                  }
                                }}
                              >
                                {cancelMutation.isLoading ? <CircularProgress size={16} /> : <Delete />}
                              </IconButton>
                            </span>
                          </Tooltip>
                        )}
                      </Box>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Status Update Dialog */}
      <Dialog open={statusDialog} onClose={() => setStatusDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Update Appointment Status</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusData.status}
                label="Status"
                onChange={(e) => setStatusData(prev => ({ ...prev, status: e.target.value }))}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="accepted">Accepted</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth multiline rows={3} label="Notes" sx={{ mb: 2 }}
              value={statusData.notes} onChange={(e) => setStatusData(prev => ({ ...prev, notes: e.target.value }))}
            />
            <TextField
              fullWidth multiline rows={3} label="Prescription" sx={{ mb: 2 }}
              value={statusData.prescription} onChange={(e) => setStatusData(prev => ({ ...prev, prescription: e.target.value }))}
            />
            <TextField
              fullWidth type="date" label="Follow-up Date"
              value={statusData.followUpDate} onChange={(e) => setStatusData(prev => ({ ...prev, followUpDate: e.target.value }))}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatusDialog(false)}>Cancel</Button>
          <Button onClick={handleStatusSubmit} variant="contained" disabled={updateStatusMutation.isLoading}>
            {updateStatusMutation.isLoading ?
              <CircularProgress size={20} color="inherit" /> :
              'Update'
            }
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Appointments