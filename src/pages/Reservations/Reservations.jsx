import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  autocompleteClasses,
  Container,
  Grid
} from "@mui/material";
import ReservationsHeader from "../../components/reservations/ReservationsHeader";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Reservations = () => {
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([
    {
      id: 1,
      date: "15/05/2025",
      time: "08:45:15am",
      items: 2,
      products: [
        { id: "B-0001", title: "Men's clothes bundle", price: 300 },
        { id: "B-0002", title: "Babies clothes bundle", price: 300 },
      ],
      location: "LIV DBN"
    },
    {
      id: 2,
      date: "15/05/2025",
      time: "08:45:15am",
      items: 2,
      products: [
        { id: "B-0001", title: "Men's clothes bundle", price: 300 },
        { id: "B-0002", title: "Babies clothes bundle", price: 300 },
      ],
      location: "LIV DBN"
    },
    {
      id: 3,
      date: "15/05/2025",
      time: "08:45:15am",
      items: 2,
      products: [
        { id: "B-0001", title: "Men's clothes bundle", price: 300 },
        { id: "B-0002", title: "Babies clothes bundle", price: 300 },
      ],
      location: "LIV DBN"
    },
    {
      id: 4,
      date: "15/05/2025",
      time: "08:45:15am",
      items: 2,
      products: [
        { id: "B-0001", title: "Men's clothes bundle", price: 300 },
        { id: "B-0002", title: "Babies clothes bundle", price: 300 },
      ],
      location: "LIV DBN"
    },
  ]);

  const handleAddReservation = () => {
    console.log("add reservation clicked");
  };

  const handleNavigateTo = (path) => {
    navigate(path);
  };

  return (
    <Container
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      p: 2,
      maxWidth: "lg",
      margin: "0 auto",
    }}
  >
      <ReservationsHeader
        title="Reservations"
        onBack={() => window.history.back()}
        onAdd={() => handleNavigateTo("/reservations/add")}
      />
      <Grid container spacing={2} sx={{ width: "100%", mt: 2 }}>
        {reservations.map((reservation, index) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                gap: 2,
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Typography variant="body2">
                  {reservation.date} {reservation.time}
                </Typography>
                <Typography variant="body2">
                  {reservation.items} items reserved
                </Typography>
              </Box>
              <IconButton
                aria-label="view reservation"
                color="primary"
                onClick={() => handleNavigateTo(`/reservations/${reservation.id}`)}
              >
                <VisibilityIcon />
                <Typography variant="caption" sx={{ ml: 1 }}>
                  View
                </Typography>
              </IconButton>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Reservations;
