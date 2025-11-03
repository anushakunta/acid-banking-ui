import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Navbar() {
  const { pathname } = useLocation()
  const isActive = (path) => pathname === path
  const auth = useSelector(s => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    dispatch({ type: 'AUTH_LOGOUT' })
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Banking Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {auth.token ? (
            <>
              <Button component={Link} to="/dashboard" variant={isActive('/dashboard') ? 'contained' : 'text'}>Dashboard</Button>
              <Button component={Link} to="/accounts" variant={isActive('/accounts') ? 'contained' : 'text'}>Accounts</Button>
              <Button onClick={logout} color="inherit">Logout</Button>
            </>
          ) : (
            <>
              <Button component={Link} to="/login" variant={isActive('/login') ? 'contained' : 'text'}>Login</Button>
              <Button component={Link} to="/signup" variant={isActive('/signup') ? 'contained' : 'text'}>Sign Up</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}
