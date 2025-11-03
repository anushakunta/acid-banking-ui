import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Grid, Paper, Typography } from '@mui/material'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function Dashboard() {
  const accounts = useSelector(state => state.accounts.items)
  const total = accounts.reduce((sum, a) => sum + Number(a.balance || 0), 0)

  const chartData = useMemo(() => ({
    labels: accounts.map(a => a.name),
    datasets: [{
      label: 'Balance',
      data: accounts.map(a => a.balance),
      fill: false
    }]
  }), [accounts])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h5">Overview</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Total Balance: ${total.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Balances by Account</Typography>
          <Line data={chartData} />
        </Paper>
      </Grid>
    </Grid>
  )
}
