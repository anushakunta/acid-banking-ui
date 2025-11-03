import React, { useState } from 'react'
import { TextField, Button, Paper, Typography, Stack } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../redux/actions/authActions'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const { loading, error } = useSelector(s => s.auth)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    await dispatch(signup(email, password))
    navigate('/dashboard')
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 420, mx: 'auto' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Sign up</Typography>
      <Stack spacing={2} component="form" onSubmit={onSubmit}>
        <TextField label="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" disabled={loading}>Create Account</Button>
      </Stack>
    </Paper>
  )
}
