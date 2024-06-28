import React, {useState, useEffect} from "react";
import { useParams, useNavigate} from "react-router-dom";
import { Box, Typography, Paper, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "../../axiosConfig";


const dummyReservations = [
  {
    id: 1,
    date: "15/05/2025",
    time: "08:45:15am",
    items: 2,
    products: [
      { id: "B-0001", title: "Men's clothes bundle", price: 300 },
      { id: "B-0002", title: "Babies clothes bundle", price: 300 },
    ],
    location: "LIV DBN",
  },
];

const ReservationDetails = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`/api/orders/${id}`);
        console.log("response.data");
        console.log(response.data);
        setReservation(response.data.order);
      } catch (error) {
        console.error("Error fetching reservation:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  const handleCancelOrder = async () => {
    try {
      const productIds = reservation.products.map((product) => product.id);
      await axios.post(`/api/orders/cancel`, {
        orderId: reservation.id,
        productIds,
      });
      navigate("/reservations"); 
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  if (isLoading) {
    return <Typography variant="h6">Loading...</Typography>;
  }


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 1,
        width: "100%",
        maxWidth: "1200px",
        minWidth: "320px",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          mb: 2,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
       
      </Box>
      <Paper
        sx={{
          p: 2,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
          <Typography variant="body1">Location:</Typography>
          <Typography variant="body2">{reservation.location}</Typography>
        </Box>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Contents:
        </Typography>
        {reservation.products && reservation.products.map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
          >
            <Typography variant="body2">
              {item.createdAt} {item.title}
            </Typography>
            <Typography variant="body2">R {item.price.toFixed(2)}</Typography>
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Total amount payable
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            R{" "}
            {reservation.products && reservation.products
              .reduce((total, item) => total + item.price, 0)
              .toFixed(2)}
          </Typography>
        </Box>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleCancelOrder}
      >
        Cancel Order
      </Button>
    </Box>
  );
};

export default ReservationDetails;
