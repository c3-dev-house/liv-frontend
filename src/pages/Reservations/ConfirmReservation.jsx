import React, {useState}from "react";
import { Toolbar, IconButton, Typography, Button, Box, Alert, CircularProgress, Collapse} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import ShowReservation from "../../components/reservations/ShowReservation";
import axios from "../../axiosConfig";
import ConfirmationModal from "../../components/ConfirmationModal";
import CustomAlert from "../../components/CustomAlert"; 


const ConfirmReservation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { reservation,isAdminAuthenticated } = location.state;
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [remainingQuantity, setRemainingQuantity] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
//todo fix contents description display.
  const handleReserve = async () => {
    setIsModalOpen(false);
    // console.log("Reservation confirmed", reservation);
    //todo supply reserved products id to requests responsible for creating a order with products supplied, as well as //keep as is.. no api call
    // the required id of the linked customer (linked in user's shopify customer id or similar) to create order
    //return 200 ok once confirmed. redirect to reservations.

    const { customerId, contents } = reservation;
    const variantIds = contents.map((product) => product.variantId);
    const productIds = contents.map((product) => product.id);

    try {
      setLoading(true);
      console.log(reservation);
      const response = await axios.post("/api/orders/create", {
        customerId,
        variantIds,
        productIds,
      });
      console.log("Order created successfully", response.data);

      // Navigate back to reservations page
      setLoading(false);
      if(isAdminAuthenticated){
        navigate(`/reservationsAdmin/${customerId}`);
      }else{
        navigate("/reservations");
      }
    } catch (error) {
      console.error("Error creating order", error);
      if (error.response && error.response.data) {
        // Capture the error message from the response
        setErrorMessage(error.response.data.error);
        setRemainingQuantity(error.response.data.remainingQuantity);
        setLoading(false);
      console.error("Error creating order", error);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setLoading(false);
      setAlertOpen(true);
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
      <CustomAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        severity="error"
        message={errorMessage}
        additionalMessage={`You can still order ${remainingQuantity} products.`}
      />
      <ShowReservation reservation={reservation} />
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ minWidth: "200px" }}
          //onClick={handleReserve}
          onClick={() => setIsModalOpen(true)}
          disabled={loading}
        >
           {loading ? <CircularProgress size={24} /> : "Reserve"}
        </Button>
      </Box>
      <ConfirmationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleReserve}
        title="Confirm Reservation"
        description="Are you sure you want to confirm this reservation?"
      />
    </Box>
  );
};

export default ConfirmReservation;
