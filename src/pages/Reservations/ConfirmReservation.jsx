import React from "react";
import { Toolbar, IconButton, Typography, Button, Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import ShowReservation from "../../components/reservations/ShowReservation"; 
import axios from "../../axiosConfig";

const ConfirmReservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservation } = location.state;

  const handleReserve = async () => {
    console.log("Reservation confirmed", reservation);
    //todo supply reserved products id to requests responsible for creating a order with products supplied, as well as 
    // the required id of the linked customer (linked in user's shopify customer id or similar) to create order
    //return 200 ok once confirmed. redirect to reservations

    const { customerId, contents } = reservation;
    const variantIds = contents.map(product => product.variantId);
    const productIds = contents.map(product => product.id);

    try {
      const response = await axios.post("/api/orders/create", {
        customerId,
        variantIds,
        productIds
      });
      console.log("Order created successfully", response.data);

      // Navigate back to reservations page
      navigate("/reservations");
    } catch (error) {
      console.error("Error creating order", error);
    }
  };
  
  

  return (
    <Box sx={{ width: "100%", padding: "16px" }}>
      <Toolbar sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={() => window.history.back()}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ marginLeft: "8px" }}>
          Confirm reservation
        </Typography>
      </Toolbar>
      <ShowReservation reservation={reservation} />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ minWidth: "200px" }}
          onClick={handleReserve}
        >
          Reserve
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmReservation;
