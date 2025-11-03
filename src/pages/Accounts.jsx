import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Card, CardContent, Typography, Divider } from '@mui/material'
import { fetchAccounts } from '../redux/actions/accountActions'
import { fetchTransactions } from '../redux/actions/transactionActions'
import TransactionForm from '../components/TransactionForm'

export default function Accounts() {
  const dispatch = useDispatch()
  const { items, loading, error } = useSelector(state => state.accounts)
  const [selectedId, setSelectedId] = useState(null)
  const tx = useSelector(state => state.transactions)

  useEffect(() => { dispatch(fetchAccounts()) }, [dispatch])
  useEffect(() => { if(selectedId) dispatch(fetchTransactions(selectedId)) }, [dispatch, selectedId])

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography color="error">{error}</Typography>

  return (
    <Grid container spacing={2}>
      {items.map(acc => (
        <Grid item xs={12} md={6} key={acc.id} onClick={() => setSelectedId(acc.id)}>
          <Card>
            <CardContent>
              <Typography variant="h6">{acc.name}</Typography>
              <Typography variant="body2">Balance: ${Number(acc.balance).toFixed(2)}</Typography>
              {selectedId === acc.id && (
                <>
                  <TransactionForm accountId={acc.id} onSuccess={() => {}} />
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2">Recent Transactions</Typography>
                  {tx.loading && <Typography>Loading...</Typography>}
                  {tx.error && <Typography color="error">{tx.error}</Typography>}
                  {!tx.loading && tx.items.slice(0,5).map(t => (
                    <Typography key={t.id} variant="body2">
                      {t.transactionType.toUpperCase()} ${t.amount} — {t.description || '—'}
                    </Typography>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
