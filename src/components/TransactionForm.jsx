import React, { useState } from 'react'
import { TextField, Button, MenuItem, Stack, Paper, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createTransaction, fetchTransactions } from '../redux/actions/transactionActions'
import { fetchAccounts } from '../redux/actions/accountActions'

export default function TransactionForm({ accountId, onSuccess }) {
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('credit')
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  const submit = async (e) => {
    e.preventDefault()
    await dispatch(createTransaction({ accountId, amount: Number(amount), transactionType: type, description }))
    await dispatch(fetchTransactions(accountId))
    await dispatch(fetchAccounts())
    setAmount(''); setDescription('')
    if (onSuccess) onSuccess()
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>New Transaction</Typography>
      <Stack direction="row" spacing={2} component="form" onSubmit={submit}>
        <TextField label="Amount" type="number" value={amount} onChange={e=>setAmount(e.target.value)} required />
        <TextField select label="Type" value={type} onChange={e=>setType(e.target.value)}>
          <MenuItem value="credit">Credit</MenuItem>
          <MenuItem value="debit">Debit</MenuItem>
        </TextField>
        <TextField label="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <Button type="submit" variant="contained">Add</Button>
      </Stack>
    </Paper>
  )
}
