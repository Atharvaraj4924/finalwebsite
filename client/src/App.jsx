// App.jsx
import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { AnimatePresence, motion } from 'framer-motion'

// Components & Pages
import Layout from './components/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import BookAppointment from './pages/BookAppointment'
import Profile from './pages/Profile'
import MedicalRecords from './pages/MedicalRecords'
import PatientVitals from './pages/PatientVitals'
import Homepage from './pages/Homepage'
import SuccessStories from './pages/SuccessStories'

// Loading Animation
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-indigo-500 to-purple-600">
    <motion.div
      className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  </div>
)

// Page Transition Wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
)

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth()

  if (loading) return <LoadingScreen />

  if (!user) return <Navigate to="/login" replace />

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

// Animated App Routes
const AppRoutes = () => {
  const { user } = useAuth()
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* Public Routes */}
        <Route path="/" element={<PageWrapper><Homepage /></PageWrapper>} />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <PageWrapper><Login /></PageWrapper>
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <PageWrapper><Register /></PageWrapper>
            )
          }
        />

        {/* Protected Routes wrapped with Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
          <Route path="appointments" element={<PageWrapper><Appointments /></PageWrapper>} />
          <Route
            path="book-appointment"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PageWrapper><BookAppointment /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route path="profile" element={<PageWrapper><Profile /></PageWrapper>} />
          <Route path="medical-records" element={<PageWrapper><MedicalRecords /></PageWrapper>} />
          <Route
            path="vitals"
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <PageWrapper><PatientVitals /></PageWrapper>
              </ProtectedRoute>
            }
          />
          <Route path="success-stories" element={<PageWrapper><SuccessStories /></PageWrapper>} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

// Main App Component
const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
)

export default App
