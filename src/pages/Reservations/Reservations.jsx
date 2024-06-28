import React, { useState, useEffect } from "react";
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
import axios from "../../axiosConfig";

const Reservations = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const customerId = "7024877994031"; // hardcoded on Grace for now
        const response = await axios.get(`/api/orders/customer-orders/${customerId}`);
        console.log("Fetched reservations:", response.data.orders);
        setReservations(response.data.orders);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

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
