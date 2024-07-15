import React,{ useState,useEffect } from 'react';
import axios from "../axiosConfig";
import { Box, Typography, Paper, Grid, Link, CircularProgress  } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import logo from '../assets/logo.png'
import jobsFund from '../assets/JobsFund.jpg'
import CustomAlert from '../components/CustomAlert';

const BrandingImages = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'fixed', 
        bottom: 0,
        maxWidth: '1200px', // Limit width to match the overview cards
        margin: '0 auto',
        width: '100%', 
        opacity: 1, 
        backgroundColor: 'white', 
        padding: '16px',
        //boxShadow: '0 -2px 5px rgba(0,0,0,0.1)' // optional: add some shadow to separate it visually
      }}
    >
      <img src={logo} alt="Logo" style={{ height: '150px', marginRight: '20px' }} />
      <img src={jobsFund} alt="Jobs Fund" style={{ height: '150px', marginRight: '16px'  }} />
    </Box>
  );
};

const Home = () => {
  const [beneficiaryOverview,setBeneficiaryOverview]=useState([]);
  const [profitPercentage, setProfitPercentage] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [alertOpen, setAlertOpen] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");

  const theme = useTheme();
  // const profit = 56.00;
  // const cost = 300.00;
  // const sales = 356.00;

  useEffect(() => {
    const fetchBeneficiaryOverview = async () => {
      setLoading(true); 
      try {
        const salesforceId = JSON.parse(localStorage.getItem('user')).Id;
        let response;
        if (salesforceId) {
          response = await axios.get(`/api/overview/beneficiarySales/${salesforceId}`);
          const overview = response.data;
          setBeneficiaryOverview(overview);

          if (overview && overview.totalSales !== 0) {
            const percentage = ((overview.totalProfit  / overview.totalSales) * 100).toFixed(0);
            setProfitPercentage(percentage);
          }
        } else {
          setError("Please log in"); // Customize this error message
          setErrorMessage('Error');
          setAlertOpen(true); // Open custom alert
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setErrorMessage('Failed to fetch beneficiary overview. Please try again.');
        setAlertOpen(true); // Open custom alert
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBeneficiaryOverview();
  }, []);
  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom>
        Overview
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body1">Profit:</Typography>
            <Typography variant="body1">Cost of Sales:</Typography>
            <Typography variant="body1">Total Sales:</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
            {loading ? (
              <CircularProgress size={24} /> 
            ) : (
              <>
                <Typography variant="body1" sx={{ color: theme.palette.green.main }}>R {beneficiaryOverview.totalProfit}</Typography>
                <Typography variant="body1">- R {beneficiaryOverview.costOfGoods}</Typography>
                <Typography variant="body1">+ R {beneficiaryOverview.totalSales}</Typography>
              </>
            )}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center' }}>
            {loading ? (
              <CircularProgress size={24} /> 
            ) : (
              <Typography variant="body1" sx={{ color: theme.palette.green.main }}>{profitPercentage}%</Typography>
            )}
          </Box>
        </Box>
      </Paper>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="body1">Bundles Bought</Typography>
            <Link href="/products">
              {loading ? <CircularProgress size={16} /> : `${beneficiaryOverview.purchaseCount} Bundles`}
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="body1">Items Sold</Typography>
            <Link href="/products">
              {loading ? <CircularProgress size={16} /> : `${beneficiaryOverview.totalQuantity} Items`}
            </Link>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="body1">Reservations</Typography>
            <Link href="/reservations">
              {loading ? <CircularProgress size={16} /> : `${beneficiaryOverview.reservedCount} Bundles`}
            </Link>
          </Paper>
        </Grid>
      </Grid>
      <CustomAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        severity="error"
        message={errorMessage}
      />
      <BrandingImages />
    </Box>
  );
};

export default Home;
