import React from 'react';
import { Box, Typography, Paper, Grid, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Home = () => {
  const theme = useTheme();
  const profit = 56.00;
  const cost = 300.00;
  const sales = 356.00;
  const profitPercentage = ((profit / sales) * 100).toFixed(2);

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Overview
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1">Profit:</Typography>
            <Typography variant="body1">Cost:</Typography>
            <Typography variant="body1">Sales:</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
            <Typography variant="body1" sx={{ color: theme.palette.green.main }}>+ R 56.00</Typography>
            <Typography variant="body1" >- R 300.00</Typography>
            <Typography variant="body1" >+ R 356.00</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center' }}>
            <Typography variant="body1" sx={{ color: theme.palette.green.main }}>{profitPercentage}%</Typography>
          </Box>
        </Box>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="body1">Bundles Bought</Typography>
            <Link href="/products">1 Bundles</Link>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="body1">Items Sold</Typography>
            <Link href="/products">13 Items</Link>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="body1">Reservations</Typography>
            <Link href="/reservations">2 Items</Link>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
