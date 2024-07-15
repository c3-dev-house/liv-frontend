import React, {useState, useEffect} from "react";
import { useParams, useNavigate,useLocation } from "react-router-dom";
import { Box, Typography, Paper, Button, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "../../axiosConfig";
import ConfirmationModal from "../../components/ConfirmationModal";
import CustomAlert from "../../components/CustomAlert";




const ReservationDetails = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen]= useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isAdmin = queryParams.get('isAdmin') === 'true';


  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`/api/orders/${id}`);
        console.log("response.data");
        console.log(response.data);
        setReservation(response.data.order);
      } catch (error) {
        console.error("Error fetching reservation:", error);
        setErrorMessage("Server error. Contact administrator.");
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  const handleCancelOrder = async () => {
    setIsModalOpen(false);
    setCancelLoading(true);
    try {
      const productIds = reservation.products.map((product) => product.id);
      await axios.post(`/api/orders/cancel`, {
        orderId: reservation.id,
        productIds,
      });
      navigate("/reservations"); 
    } catch (error) {
      console.error("Error canceling order:", error);
      setErrorMessage("Server error. Contact administrator.");
      setAlertOpen(true);
    } finally {
      setCancelLoading(false);
    }
  };

  const handleMarkAsPaid = async () => {
    setPaymentModalOpen(false);
    try {
      const productIds = reservation.products.map((product) => product.id);
      await axios.post(`/api/orders/markAsPaid`, {
        orderId: reservation.id,
        productIds,
      });
      navigate(`/reservationsAdmin/${id}`); 
    } catch (error) {
      console.error("Error canceling order:", error);
      setErrorMessage("Server error. Contact administrator.");
      setAlertOpen(true);
    } finally {
      setCancelLoading(false);
    }
  };


  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
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
          disabled={cancelLoading}
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
      <div style={{ display:'flex',gap:'1rem' }}>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2, minWidth: "200px" }}
        onClick={() => setIsModalOpen(true)}
        disabled={cancelLoading}
      >
        {cancelLoading ? <CircularProgress size={24} /> : "Cancel Order"}
      </Button>
      {isAdmin &&(
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2}}
          //onClick={handleCancelOrder}
          onClick={() => setPaymentModalOpen(true)}
        >
          Mark As Paid
        </Button>
      )}
      </div>
      <ConfirmationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCancelOrder}
        title="Cancel Order"
        description="Are you sure you want to cancel this order?"
      />
      <CustomAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        severity="error"
        message={errorMessage}
      />
      <ConfirmationModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onConfirm={handleMarkAsPaid}
        title="Confirm Payment"
        description="Are you sure you want to mark this order as paid?"
      />
    </Box>
  );
};

export default ReservationDetails;
