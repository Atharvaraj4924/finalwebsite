// context/AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { motion } from 'framer-motion'
import api from '../services/api'

// Create Auth Context
const AuthContext = createContext()

// Initial State
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null
}

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null }
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload.user, token: action.payload.token, loading: false, error: null }
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload }
    case 'LOGOUT':
      return { ...state, user: null, token: null, loading: false, error: null }
    case 'UPDATE_USER':
      return { ...state, user: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

// Animated Snackbar Wrapper (adds motion to notistack)
const AnimatedSnackbar = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.3 }}
  >
    {message}
  </motion.div>
)

// Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const { enqueueSnackbar } = useSnackbar()

  // Axios interceptor setup
  useEffect(() => {
    if (state.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`
    } else {
      delete api.defaults.headers.common['Authorization']
    }
  }, [state.token])

  // Check auth on app start
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await api.get('/auth/me')
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user: response.data, token } })
        } catch {
          localStorage.removeItem('token')
          dispatch({ type: 'LOGOUT' })
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }

    checkAuth()
  }, [])

  // Actions
  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const { data } = await api.post('/auth/login', credentials)
      const { user, token } = data

      localStorage.setItem('token', token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } })

      enqueueSnackbar(<AnimatedSnackbar message="Login successful!" />, { variant: 'success' })
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      dispatch({ type: 'LOGIN_FAILURE', payload: message })
      enqueueSnackbar(<AnimatedSnackbar message={message} />, { variant: 'error' })
      return { success: false, error: message }
    }
  }

  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const { data } = await api.post('/auth/register', userData)
      const { user, token } = data

      localStorage.setItem('token', token)
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } })

      enqueueSnackbar(<AnimatedSnackbar message="Registration successful!" />, { variant: 'success' })
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      dispatch({ type: 'LOGIN_FAILURE', payload: message })
      enqueueSnackbar(<AnimatedSnackbar message={message} />, { variant: 'error' })
      return { success: false, error: message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
    enqueueSnackbar(<AnimatedSnackbar message="Logged out successfully" />, { variant: 'info' })
  }

  const updateProfile = async (profileData) => {
    try {
      const { data } = await api.put('/auth/profile', profileData)
      dispatch({ type: 'UPDATE_USER', payload: data.user })
      enqueueSnackbar(<AnimatedSnackbar message="Profile updated successfully!" />, { variant: 'success' })
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed'
      enqueueSnackbar(<AnimatedSnackbar message={message} />, { variant: 'error' })
      return { success: false, error: message }
    }
  }

  const value = {
    user: state.user,
    token: state.token,
    loading: state.loading,
    error: state.error,
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
