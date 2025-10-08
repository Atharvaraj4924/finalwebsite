import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
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
  Avatar,
  Divider,
  Paper,
  InputAdornment,
  Fab,
  Alert
} from '@mui/material'
import {
  Add,
  Edit,
  Visibility,
  Phone,
  LocationOn,
  Person,
  LocalHospital,
  MonitorHeart,
  Search,
  Close,
  Save,
  CalendarToday,
  ArrowBack,
  Delete as DeleteIcon
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'
import { useSnackbar } from 'notistack'
import api from '../services/api'
import { format, addDays } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'

const bgStyle = {
  position: 'fixed',
  left: 0, top: 0,
  minHeight: '100vh',
  width: '100vw',
  background: 'linear-gradient(135deg, #e3f2fd 0%, #e0f7fa 80%)',
  zIndex: 0
}

const cardStyles = {
  borderRadius: 5,
  boxShadow: '0 8px 32px 0 #00b8d480',
  transition: 'box-shadow .23s cubic-bezier(.53,1.74,.43,.88)',
  background: 'rgba(255,255,255,0.98)'
}

const MedicalRecords = () => {
  const { user } = useAuth()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [medicalFormOpen, setMedicalFormOpen] = useState(false)
  const [viewMode, setViewMode] = useState('list') // 'list' or 'records'
  const [selectedPatientRecords, setSelectedPatientRecords] = useState([])
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingRecordId, setEditingRecordId] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    diagnosis: '',
    symptoms: [],
    prescription: {
      medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
      notes: ''
    },
    treatment: '',
    followUp: {
      required: false,
      date: '',
      notes: ''
    },
    remedy: '', // Doctor-only field
    formula: '', // Doctor-only field
    notes: ''
  })

  // Fetch all patients (for doctors) or patient's own records
  const { data: patientsData, isLoading: patientsLoading } = useQuery(
    ['all-patients', searchTerm],
    () => api.get(`/medical-records/patients?search=${searchTerm}`).then(res => res.data),
    { 
      enabled: user?.role === 'doctor',
      refetchOnWindowFocus: false
    }
  )

  // Fetch patient's own medical records
  const { data: recordsData, isLoading: recordsLoading } = useQuery(
    ['medical-records', user?._id],
    () => api.get(`/medical-records/patient/${user?._id}`).then(res => res.data),
    { 
      enabled: user?.role === 'patient' && !!user?._id,
      refetchOnWindowFocus: false
    }
  )

  // Fetch specific patient's records
  const { data: patientRecordsData, isLoading: patientRecordsLoading, error: patientRecordsError } = useQuery(
    ['patient-records', selectedPatient?._id],
    () => {
      console.log('Fetching medical records for patient:', selectedPatient?._id)
      return api.get(`/medical-records/patient/${selectedPatient?._id}`).then(res => {
        console.log('Medical records response:', res.data)
        return res.data
      })
    },
    { 
      enabled: !!selectedPatient?._id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log('Query succeeded with data:', data)
      },
      onError: (error) => {
        console.error('Query failed with error:', error)
      }
    }
  )

  // Create medical record mutation
  const createMedicalRecordMutation = useMutation(
    (data) => api.post('/medical-records', data),
    {
      onSuccess: (response) => {
        console.log('Medical record created successfully:', response.data)
        enqueueSnackbar('Medical record created successfully', { variant: 'success' })
        setMedicalFormOpen(false)
        resetForm()
        // Invalidate all related queries to refresh the data
        console.log('Invalidating queries for patient:', selectedPatient?._id)
        // Invalidate with exact query key
        queryClient.invalidateQueries(['patient-records', selectedPatient?._id])
        queryClient.invalidateQueries(['all-patients', searchTerm])
        queryClient.invalidateQueries(['medical-records'])
        // Force refetch the current patient's records
        queryClient.refetchQueries(['patient-records', selectedPatient?._id])
        // Also refetch all patients to update the latest record
        queryClient.refetchQueries(['all-patients', searchTerm])
        
        // Add a small delay and then refetch again to ensure data is updated
        setTimeout(() => {
          queryClient.refetchQueries(['patient-records', selectedPatient?._id])
        }, 500)
      },
      onError: (error) => {
        enqueueSnackbar(error.response?.data?.message || 'Failed to create medical record', { variant: 'error' })
      }
    }
  )

  // Update medical record mutation
  const updateMedicalRecordMutation = useMutation(
    ({ id, data }) => api.put(`/medical-records/${id}`, data),
    {
      onSuccess: () => {
        enqueueSnackbar('Medical record updated successfully', { variant: 'success' })
        setMedicalFormOpen(false)
        setIsEditMode(false)
        setEditingRecordId(null)
        // Refresh queries
        queryClient.invalidateQueries(['patient-records', selectedPatient?._id])
        queryClient.invalidateQueries(['all-patients', searchTerm])
        queryClient.refetchQueries(['patient-records', selectedPatient?._id])
      },
      onError: (error) => {
        enqueueSnackbar(error.response?.data?.message || 'Failed to update medical record', { variant: 'error' })
      }
    }
  )

  // Delete medical record mutation
  const deleteMedicalRecordMutation = useMutation(
    (id) => api.delete(`/medical-records/${id}`),
    {
      onSuccess: () => {
        enqueueSnackbar('Medical record deleted', { variant: 'success' })
        // Refresh queries
        queryClient.invalidateQueries(['patient-records', selectedPatient?._id])
        queryClient.invalidateQueries(['all-patients', searchTerm])
        queryClient.refetchQueries(['patient-records', selectedPatient?._id])
      },
      onError: (error) => {
        enqueueSnackbar(error.response?.data?.message || 'Failed to delete medical record', { variant: 'error' })
      }
    }
  )

  const resetForm = () => {
    setFormData({
      diagnosis: '',
      symptoms: [],
      prescription: {
        medications: [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
        notes: ''
      },
      treatment: '',
      followUp: {
        required: false,
        date: '',
        notes: ''
      },
      remedy: '', // Doctor-only field
      formula: '', // Doctor-only field
      notes: ''
    })
  }

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient)
    setViewMode('records')
    setSelectedPatientRecords(patient.latestMedicalRecord ? [patient.latestMedicalRecord] : [])
  }

  const handleBackToList = () => {
    setViewMode('list')
    setSelectedPatient(null)
    setSelectedPatientRecords([])
  }

  const handleAddMedicalRecord = () => {
    if (!selectedPatient) return
    
    const data = {
      patientId: selectedPatient._id,
      ...formData,
      symptoms: formData.symptoms.filter(s => s.trim() !== ''),
      prescription: {
        ...formData.prescription,
        medications: formData.prescription.medications.filter(med => med.name.trim() !== '')
      }
    }
    
    console.log('Creating medical record for patient:', selectedPatient._id, 'Data:', data)
    if (isEditMode && editingRecordId) {
      updateMedicalRecordMutation.mutate({ id: editingRecordId, data })
    } else {
      createMedicalRecordMutation.mutate(data)
    }
  }

  const handleEditRecord = (record) => {
    // Prefill form
    setFormData({
      diagnosis: record.diagnosis || '',
      symptoms: Array.isArray(record.symptoms) ? record.symptoms : [],
      prescription: {
        medications: record?.prescription?.medications?.length ? record.prescription.medications : [{ name: '', dosage: '', frequency: '', duration: '', instructions: '' }],
        notes: record?.prescription?.notes || ''
      },
      treatment: record.treatment || '',
      followUp: {
        required: !!record?.followUp?.required,
        date: record?.followUp?.date ? new Date(record.followUp.date).toISOString().split('T')[0] : '',
        notes: record?.followUp?.notes || ''
      },
      remedy: record.remedy || '',
      formula: record.formula || '',
      notes: record.notes || ''
    })
    setIsEditMode(true)
    setEditingRecordId(record._id)
    setMedicalFormOpen(true)
  }

  const handleDeleteRecord = (recordId) => {
    // Simple confirm
    if (window.confirm('Are you sure you want to delete this medical record?')) {
      deleteMedicalRecordMutation.mutate(recordId)
    }
  }

  const handleNextAppointmentChange = (days) => {
    const nextDate = addDays(new Date(), days)
    setFormData(prev => ({
      ...prev,
      followUp: {
        ...prev.followUp,
        required: true,
        date: nextDate.toISOString().split('T')[0]
      }
    }))
  }

  const addMedication = () => {
    setFormData(prev => ({
      ...prev,
      prescription: {
        ...prev.prescription,
        medications: [...prev.prescription.medications, { name: '', dosage: '', frequency: '', duration: '', instructions: '' }]
      }
    }))
  }

  const removeMedication = (index) => {
    setFormData(prev => ({
      ...prev,
      prescription: {
        ...prev.prescription,
        medications: prev.prescription.medications.filter((_, i) => i !== index)
      }
    }))
  }

  const updateMedication = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      prescription: {
        ...prev.prescription,
        medications: prev.prescription.medications.map((med, i) => 
          i === index ? { ...med, [field]: value } : med
        )
      }
    }))
  }

  const addSymptom = (symptom) => {
    if (symptom.trim() && !formData.symptoms.includes(symptom.trim())) {
      setFormData(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, symptom.trim()]
      }))
    }
  }

  const removeSymptom = (symptom) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter(s => s !== symptom)
    }))
  }

  if (user?.role === 'patient') {
    // Patient view - show their own medical records
    const medicalRecords = recordsData?.medicalRecords || []
    const isLoading = recordsLoading

    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px" position="relative" zIndex={1}>
          <CircularProgress size={32} color="primary" />
        </Box>
      )
    }

    return (
      <>
        <Box sx={bgStyle} />
        <Box sx={{ position: 'relative', zIndex: 1, minHeight: '100vh', px: { xs: 1, sm: 3 }, pt: 4, pb: 9 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.67, ease: 'easeOut' }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: .6,
                letterSpacing: '.04em',
                color: 'primary.main',
                textShadow: '0 10px 20px #64b5f633'
              }}
            >
              My Medical Records
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              See a detailed history of your health and past care visits
            </Typography>
          </motion.div>

          {medicalRecords.length === 0 ? (
            <Card sx={{
              ...cardStyles,
              mt: 10,
              mb: 6,
              mx: 'auto',
              maxWidth: 430,
              textAlign: "center",
              p: 3
            }}>
              <motion.div
                initial={{ opacity: 0.5, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <LocalHospital sx={{ fontSize: 60, color: "primary.light", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No medical records found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Book a consultation to start building your health history.
                </Typography>
              </motion.div>
            </Card>
          ) : (
            <Grid container spacing={3} sx={{ mt: 0 }}>
              <AnimatePresence>
                {medicalRecords.map((record) => (
                  <Grid item xs={12} key={record._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 19 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.38, ease: 'easeOut' }}
                    >
                      <Card sx={{ ...cardStyles, mb: 2 }}>
                        <CardContent>
                          {/* Doctor & timestamp */}
                          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {record.doctor?.name || "Doctor"} <span style={{ color: '#80cbc4', fontWeight: 400 }}>
                                {record.doctor?.specialization ? ` – ${record.doctor.specialization}` : ""}
                              </span>
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {format(new Date(record.createdAt), 'MMM dd, yyyy')}
                            </Typography>
                          </Box>

                          {/* Diagnosis */}
                          {record.diagnosis && (
                            <Box mb={2}>
                              <Typography variant="subtitle2" sx={{ color: 'primary.dark', fontWeight: 700 }} gutterBottom>
                                Diagnosis
                              </Typography>
                              <Typography variant="body2">{record.diagnosis}</Typography>
                            </Box>
                          )}

                          {/* Symptoms as chips */}
                          {record.symptoms && record.symptoms.length > 0 && (
                            <Box mb={2}>
                              <Typography variant="subtitle2" sx={{ color: 'primary.dark', fontWeight: 700 }} gutterBottom>
                                Symptoms
                              </Typography>
                              <Box display="flex" gap={1} flexWrap="wrap">
                                {record.symptoms.map((symptom, idx) => (
                                  <Chip key={idx} label={symptom} size="small" sx={{ bgcolor: 'primary.lighter', fontWeight: 500 }} />
                                ))}
                              </Box>
                            </Box>
                          )}

                          {/* Prescription section */}
                          {record.prescription && (
                            <Box mb={2}>
                              <Typography variant="subtitle2" sx={{ color: '#1b806a', fontWeight: 700 }} gutterBottom>
                                Prescription
                              </Typography>
                              <Typography variant="body2" sx={{ mb: 1 }}>{record.prescription.notes}</Typography>
                              {record.prescription.medications && record.prescription.medications.length > 0 && (
                                <List dense sx={{ pl: 1 }}>
                                  {record.prescription.medications.map((med, idx) => (
                                    <ListItem key={idx} sx={{ pl: 0, mb: .5 }}>
                                      <ListItemText
                                        primary={
                                          <span><span style={{ fontWeight: 600 }}>{med.name}</span> – {med.dosage}, {med.frequency}, {med.duration}</span>
                                        }
                                      />
                                    </ListItem>
                                  ))}
                                </List>
                              )}
                            </Box>
                          )}

                          {/* Treatment */}
                          {record.treatment && (
                            <Box mb={2}>
                              <Typography variant="subtitle2" sx={{ color: 'primary.dark', fontWeight: 700 }} gutterBottom>
                                Treatment
                              </Typography>
                              <Typography variant="body2">{record.treatment}</Typography>
                            </Box>
                          )}

                          {/* Notes */}
                          {record.notes && (
                            <Box mb={2}>
                              <Typography variant="subtitle2" sx={{ color: 'primary.dark', fontWeight: 700 }} gutterBottom>
                                Notes
                              </Typography>
                              <Typography variant="body2">{record.notes}</Typography>
                            </Box>
                          )}

                          {/* Follow-up */}
                          {record.followUp && record.followUp.required && (
                            <Box>
                              <Typography variant="subtitle2" sx={{ color: 'warning.main', fontWeight: 700 }} gutterBottom>
                                Follow-up Required
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                Date: {format(new Date(record.followUp.date), 'MMM dd, yyyy')}
                              </Typography>
                              {record.followUp.notes && (
                                <Typography variant="body2" color="text.secondary">
                                  {record.followUp.notes}
                                </Typography>
                              )}
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          )}
        </Box>
      </>
    )
  }

  // Doctor view - show all patients
  const patients = patientsData?.patients || []
  const isLoading = patientsLoading

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px" position="relative" zIndex={1}>
        <CircularProgress size={32} color="primary" />
      </Box>
    )
  }

  if (viewMode === 'records' && selectedPatient) {
    // Show selected patient's records
    const records = patientRecordsData?.medicalRecords || []
    const isLoadingRecords = patientRecordsLoading
    
    console.log('Displaying records for patient:', selectedPatient._id)
    console.log('Patient records data:', patientRecordsData)
    console.log('Records array:', records)
    console.log('Is loading:', isLoadingRecords)
    console.log('Query error:', patientRecordsError)

    return (
      <>
        <Box sx={bgStyle} />
        <Box sx={{ position: 'relative', zIndex: 1, minHeight: '100vh', px: { xs: 1, sm: 3 }, pt: 4, pb: 9 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.67, ease: 'easeOut' }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
              <Box>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={handleBackToList}
                  sx={{ mb: 2 }}
                >
                  Back to Patients
                </Button>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '.04em',
                    color: 'primary.main',
                    textShadow: '0 10px 20px #64b5f633'
                  }}
                >
                  {selectedPatient.name}'s Medical Records
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setMedicalFormOpen(true)}
                sx={{ borderRadius: 3 }}
              >
                Add Medical Record
              </Button>
            </Box>

            {/* Patient Info Card */}
            <Card sx={{ ...cardStyles, mb: 3 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {selectedPatient.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedPatient.age} years old • {selectedPatient.gender}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{selectedPatient.phone}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">{selectedPatient.address}</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Medical Records */}
            {patientRecordsError ? (
              <Card sx={{ ...cardStyles, textAlign: 'center', p: 4 }}>
                <Alert severity="error" sx={{ mb: 2 }}>
                  Error loading medical records: {patientRecordsError.message}
                </Alert>
                <Button onClick={() => queryClient.refetchQueries(['patient-records', selectedPatient?._id])}>
                  Retry
                </Button>
              </Card>
            ) : isLoadingRecords ? (
              <Box display="flex" justifyContent="center" py={4}>
                <CircularProgress />
              </Box>
            ) : records.length === 0 ? (
              <Card sx={{ ...cardStyles, textAlign: 'center', p: 4 }}>
                <LocalHospital sx={{ fontSize: 60, color: "primary.light", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No medical records found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Add the first medical record for this patient.
                </Typography>
              </Card>
            ) : (
              <Grid container spacing={3}>
                {records.map((record) => (
                  <Grid item xs={12} key={record._id}>
                    <Card sx={{ ...cardStyles }}>
                      <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {format(new Date(record.createdAt), 'MMM dd, yyyy')}
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <Chip 
                              label={record.doctor?.name || 'Doctor'} 
                              size="small" 
                              color="primary" 
                            />
                            {user?.role === 'doctor' && (
                              <Box display="flex" alignItems="center" gap={0.5}>
                                <Tooltip title="Edit record" arrow>
                                  <IconButton size="small" onClick={() => handleEditRecord(record)}>
                                    <Edit fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete record" arrow>
                                  <IconButton size="small" color="error" onClick={() => handleDeleteRecord(record._id)} disabled={deleteMedicalRecordMutation.isLoading}>
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            )}
                          </Box>
                        </Box>

                        {record.diagnosis && (
                          <Box mb={2}>
                            <Typography variant="subtitle2" sx={{ color: 'primary.dark', fontWeight: 700 }} gutterBottom>
                              Diagnosis
                            </Typography>
                            <Typography variant="body2">{record.diagnosis}</Typography>
                          </Box>
                        )}

                        {record.symptoms && record.symptoms.length > 0 && (
                          <Box mb={2}>
                            <Typography variant="subtitle2" sx={{ color: 'primary.dark', fontWeight: 700 }} gutterBottom>
                              Symptoms
                            </Typography>
                            <Box display="flex" gap={1} flexWrap="wrap">
                              {record.symptoms.map((symptom, idx) => (
                                <Chip key={idx} label={symptom} size="small" />
                              ))}
                            </Box>
                          </Box>
                        )}

                        {record.prescription && record.prescription.medications && record.prescription.medications.length > 0 && (
                          <Box mb={2}>
                            <Typography variant="subtitle2" sx={{ color: '#1b806a', fontWeight: 700 }} gutterBottom>
                              Prescription
                            </Typography>
                            <List dense>
                              {record.prescription.medications.map((med, idx) => (
                                <ListItem key={idx} sx={{ pl: 0 }}>
                                  <ListItemText
                                    primary={
                                      <span>
                                        <span style={{ fontWeight: 600 }}>{med.name}</span> – {med.dosage}, {med.frequency}, {med.duration}
                                      </span>
                                    }
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}

                        {record.treatment && (
                          <Box mb={2}>
                            <Typography variant="subtitle2" sx={{ color: 'primary.dark', fontWeight: 700 }} gutterBottom>
                              Treatment
                            </Typography>
                            <Typography variant="body2">{record.treatment}</Typography>
                          </Box>
                        )}

                        {/* Doctor-only fields: Remedy and Formula */}
                        {user?.role === 'doctor' && (record.remedy || record.formula) && (
                          <Box mb={2}>
                            <Divider sx={{ my: 2 }}>
                              <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>
                                Doctor's Private Notes
                              </Typography>
                            </Divider>
                            
                            {record.remedy && (
                              <Box mb={2}>
                                <Typography variant="subtitle2" sx={{ color: '#9c27b0', fontWeight: 700 }} gutterBottom>
                                  Remedy
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  backgroundColor: '#f3e5f5', 
                                  p: 2, 
                                  borderRadius: 1,
                                  border: '1px solid #e1bee7'
                                }}>
                                  {record.remedy}
                                </Typography>
                              </Box>
                            )}

                            {record.formula && (
                              <Box mb={2}>
                                <Typography variant="subtitle2" sx={{ color: '#9c27b0', fontWeight: 700 }} gutterBottom>
                                  Formula
                                </Typography>
                                <Typography variant="body2" sx={{ 
                                  backgroundColor: '#f3e5f5', 
                                  p: 2, 
                                  borderRadius: 1,
                                  border: '1px solid #e1bee7'
                                }}>
                                  {record.formula}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        )}

                        {/* Show indicator to patients that doctor has private notes */}
                        {user?.role === 'patient' && (record.remedy || record.formula) && (
                          <Box mb={2}>
                            <Alert severity="info" sx={{ backgroundColor: '#e3f2fd' }}>
                              <Typography variant="body2">
                                <strong>Doctor's Private Notes:</strong> This record contains additional medical information that is only visible to healthcare providers.
                              </Typography>
                            </Alert>
                          </Box>
                        )}

                        {record.followUp && record.followUp.required && (
                          <Box>
                            <Typography variant="subtitle2" sx={{ color: 'warning.main', fontWeight: 700 }} gutterBottom>
                              Follow-up Required
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                              Date: {format(new Date(record.followUp.date), 'MMM dd, yyyy')}
                            </Typography>
                            {record.followUp.notes && (
                              <Typography variant="body2" color="text.secondary">
                                {record.followUp.notes}
                              </Typography>
                            )}
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </motion.div>
        </Box>

        {/* Medical Record Form Dialog */}
        <Dialog 
          open={medicalFormOpen} 
          onClose={() => setMedicalFormOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            {isEditMode ? 'Edit' : 'Add'} Medical Record for {selectedPatient?.name}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Diagnosis"
                    value={formData.diagnosis}
                    onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
                    multiline
                    rows={2}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Add Symptom"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addSymptom(e.target.value)
                        e.target.value = ''
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button onClick={(e) => {
                            const input = e.target.closest('.MuiTextField-root').querySelector('input')
                            addSymptom(input.value)
                            input.value = ''
                          }}>
                            Add
                          </Button>
                        </InputAdornment>
                      )
                    }}
                  />
                  <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                    {formData.symptoms.map((symptom, idx) => (
                      <Chip
                        key={idx}
                        label={symptom}
                        onDelete={() => removeSymptom(symptom)}
                        size="small"
                      />
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Prescription
                  </Typography>
                  {formData.prescription.medications.map((med, idx) => (
                    <Card key={idx} sx={{ mb: 2, p: 2 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Medicine Name"
                            value={med.name}
                            onChange={(e) => updateMedication(idx, 'name', e.target.value)}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Dosage"
                            value={med.dosage}
                            onChange={(e) => updateMedication(idx, 'dosage', e.target.value)}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Frequency"
                            value={med.frequency}
                            onChange={(e) => updateMedication(idx, 'frequency', e.target.value)}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            fullWidth
                            label="Duration"
                            value={med.duration}
                            onChange={(e) => updateMedication(idx, 'duration', e.target.value)}
                            size="small"
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Box display="flex" alignItems="center" height="100%">
                            <Button
                              color="error"
                              onClick={() => removeMedication(idx)}
                              disabled={formData.prescription.medications.length === 1}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
                  ))}
                  <Button onClick={addMedication} startIcon={<Add />}>
                    Add Medicine
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Treatment"
                    value={formData.treatment}
                    onChange={(e) => setFormData(prev => ({ ...prev, treatment: e.target.value }))}
                    multiline
                    rows={3}
                  />
                </Grid>

                {/* Doctor-only section: Remedy and Formula */}
                {user?.role === 'doctor' && (
                  <>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }}>
                        <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 600 }}>
                          Doctor's Private Notes
                        </Typography>
                      </Divider>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Remedy"
                        value={formData.remedy}
                        onChange={(e) => setFormData(prev => ({ ...prev, remedy: e.target.value }))}
                        multiline
                        rows={3}
                        placeholder="Enter specific remedy or treatment approach..."
                        helperText="This information is only visible to doctors"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Formula"
                        value={formData.formula}
                        onChange={(e) => setFormData(prev => ({ ...prev, formula: e.target.value }))}
                        multiline
                        rows={3}
                        placeholder="Enter medicine formula or composition details..."
                        helperText="This information is only visible to doctors"
                      />
                    </Grid>
                  </>
                )}

                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Next Appointment
                  </Typography>
                  <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                    {[3, 5, 10, 15].map(days => (
                      <Button
                        key={days}
                        variant={formData.followUp.date === addDays(new Date(), days).toISOString().split('T')[0] ? 'contained' : 'outlined'}
                        onClick={() => handleNextAppointmentChange(days)}
                        size="small"
                      >
                        {days} days
                      </Button>
                    ))}
                  </Box>
                  {formData.followUp.required && (
                    <TextField
                      fullWidth
                      label="Follow-up Notes"
                      value={formData.followUp.notes}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        followUp: { ...prev.followUp, notes: e.target.value }
                      }))}
                      multiline
                      rows={2}
                    />
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Additional Notes"
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    multiline
                    rows={3}
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setMedicalFormOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleAddMedicalRecord}
              variant="contained"
              disabled={createMedicalRecordMutation.isLoading || updateMedicalRecordMutation.isLoading}
            >
              {createMedicalRecordMutation.isLoading || updateMedicalRecordMutation.isLoading ? 'Saving...' : (isEditMode ? 'Update Record' : 'Save Record')}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }

  // Default view - show all patients list
  return (
    <>
      <Box sx={bgStyle} />
      <Box sx={{ position: 'relative', zIndex: 1, minHeight: '100vh', px: { xs: 1, sm: 3 }, pt: 4, pb: 9 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.67, ease: 'easeOut' }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: .6,
              letterSpacing: '.04em',
              color: 'primary.main',
              textShadow: '0 10px 20px #64b5f633'
            }}
          >
            All Patients
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            View and manage all registered patients
          </Typography>

          {/* Search Bar */}
          <Card sx={{ ...cardStyles, mb: 3 }}>
            <CardContent>
              <TextField
                fullWidth
                placeholder="Search patients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  )
                }}
              />
            </CardContent>
          </Card>

          {/* Patients List */}
          {patients.length === 0 ? (
            <Card sx={{ ...cardStyles, textAlign: 'center', p: 4 }}>
              <Person sx={{ fontSize: 60, color: "primary.light", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No patients found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchTerm ? 'Try adjusting your search terms.' : 'No patients have registered yet.'}
              </Typography>
            </Card>
          ) : (
            <Grid container spacing={3}>
              {patients.map((patient) => (
                <Grid item xs={12} sm={6} md={4} key={patient._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 19 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.38, ease: 'easeOut' }}
                  >
                    <Card 
                      sx={{ 
                        ...cardStyles, 
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 40px 0 #00b8d480'
                        },
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => handlePatientSelect(patient)}
                    >
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                            <Person />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {patient.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {patient.age} years old • {patient.gender}
                            </Typography>
                          </Box>
                        </Box>

                        <Box display="flex" alignItems="center" mb={1}>
                          <Phone sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                          <Typography variant="body2">{patient.phone}</Typography>
                        </Box>

                        <Box display="flex" alignItems="center" mb={2}>
                          <LocationOn sx={{ mr: 1, color: 'text.secondary', fontSize: 16 }} />
                          <Typography variant="body2" noWrap>
                            {patient.address}
                          </Typography>
                        </Box>

                        {patient.latestMedicalRecord ? (
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              Last visit: {format(new Date(patient.latestMedicalRecord.createdAt), 'MMM dd, yyyy')}
                            </Typography>
                            {patient.latestMedicalRecord.diagnosis && (
                              <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                                "{patient.latestMedicalRecord.diagnosis}"
                              </Typography>
                            )}
                          </Box>
                        ) : (
                          <Typography variant="caption" color="warning.main">
                            No medical records yet
                          </Typography>
                        )}

                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<Visibility />}
                          sx={{ mt: 2 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            handlePatientSelect(patient)
                          }}
                        >
                          View Records
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </motion.div>
      </Box>
    </>
  )
}

export default MedicalRecords