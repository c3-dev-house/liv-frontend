import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


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
  const reservationId = parseInt(id, 10);
  console.log(id);
  const reservation = dummyReservations.find((res) => res.id === reservationId);
  console.log(reservation);
  if (!reservation) {
    return <Typography variant="h6">Reservation not found</Typography>;
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
        {reservation.products.map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
          >
            <Typography variant="body2">
              {item.id} {item.title}
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
            {reservation.products
              .reduce((total, item) => total + item.price, 0)
              .toFixed(2)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReservationDetails;
