import React, { useState } from 'react'
import { TextField, Button, Paper, Typography, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/actions/authActions'
import { useNavigate, useLocation, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('user@example.com')
  const [password, setPassword] = useState('Password1!')
  const dispatch = useDispatch()
  const { loading, error, token } = useSelector(s => s.auth)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const onSubmit = async (e) => {
    e.preventDefault()
    await dispatch(login(email, password))
    if (!error) navigate(from, { replace: true })
  }

  if (token) return null

  return (
    <Paper sx={{ p: 3, maxWidth: 420, mx: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Log in</Typography>
      <Stack spacing={2} component="form" onSubmit={onSubmit}>
        <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" disabled={loading}>Login</Button>
        <Typography variant="body2">No account? <Link to="/signup">Sign up</Link></Typography>
      </Stack>
    </Paper>
  )
}
