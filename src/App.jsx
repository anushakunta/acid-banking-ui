import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { CssBaseline, Container } from '@mui/material'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Accounts from './pages/Accounts'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/accounts" element={<ProtectedRoute><Accounts /></ProtectedRoute>} />
        </Routes>
      </Container>
    </>
  )
}
