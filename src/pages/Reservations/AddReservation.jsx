import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { useNavigate } from "react-router-dom";
import {
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProductCard from "../../components/reservations/ProductCard";
import { useAuth } from "../../context/AuthContext";
import CustomAlert from "../../components/CustomAlert";
import ConfirmationModal from "../../components/ConfirmationModal";
import Spinner from "../../components/Spinner";

const AddReservation = ({ onBack }) => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [location, setLocation] = useState("KZN");
  const [category, setCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const { currentUser, isAdminAuthenticated,isAuthenticated} = useAuth();
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [markPaidLoading, setMarkPaidLoading] = useState(false);
  const [reservation, setReservation] = useState(null);
  const [remainingQuantity, setRemainingQuantity] = useState(0);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const vendor = encodeURIComponent(location);
      const productType = encodeURIComponent(category);
      let response;
      if (category === "All") {
        response = await axios.get(`/api/products/vendor-products?vendor=${vendor}`);
      } else {
        response = await axios.get(`/api/products/vendor-products/category?vendor=${vendor}&product_type=${productType}`);
      }
      const activeProducts = response.data
        .filter(product => product.status === 'active')
        .map(product => ({
          id: product.id,
          title: product.title,
          bodyHtml: product.bodyHtml,
          createdAt: product.createdAt,
          price: product.variants[0].price,
          variantId: product.variants[0].id,
          location: product.vendor,
        }));
      setProducts(activeProducts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setErrorMessage("Server error. Contact administrator.");
      setAlertOpen(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [location, category]);


    // const fetchReservation = async (customerId) => {
    //   try {
    //     const response = await axios.get(`/api/orders/${customerId}`);
    //     // console.log("response.data");
    //     console.log('order data',response.data.order);
    //     setReservation(response.data.order);
    //   } catch (error) {
    //     console.error("Error fetching reservation:", error);
    //     setErrorMessage("Server error. Contact administrator.");
    //     setAlertOpen(true);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

  const handleNavigateTo = (path) => {
    navigate(path);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handlePlaceOrder = () => {
    let customerId;
    if (isAdminAuthenticated) {
      customerId = JSON.parse(localStorage.getItem("shopifyId"));
    } else {
      customerId = currentUser.Shopify_Id__c;
    }

    if (!customerId) {
      setErrorMessage("Customer ID not found. Please contact the administrator.");
      setAlertOpen(true);
      return null;
    }

    const reservation = {
      customerId,
      location,
      contents: products
        .filter((product) => selectedProducts.includes(product.id))
        .map((product) => ({
          ...product,
          quantity: 1,
        })),
    };
    if (!isAdminAuthenticated) {
      navigate("/confirm-reservation", { state: { reservation, isAdminAuthenticated } });
    }
    return reservation;
  };

  const handleReserve = async (reservation) => {
    const { customerId, contents } = reservation;
    const variantIds = contents.map((product) => product.variantId);
    const productIds = contents.map((product) => product.id);

    try {
      setLoading(true);
      const response = await axios.post("/api/orders/create", { //Change back
        customerId,
        variantIds,
        productIds,
      });
      console.log('response.data.order', response.data.order)
      setReservation(response.data.order);
      setLoading(false);
      // if (isAdminAuthenticated) {
      //   navigate(`/reservationsAdmin/${customerId}`);
      // } else {
      //   navigate("/reservations");
      // }
      return response.data.order;
    } catch (error) {
      console.error("Error creating order", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error);
        setRemainingQuantity(error.response.data.remainingQuantity);
        setLoading(false);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setLoading(false);
      setAlertOpen(true);
    }
  };

  const handleMarkAsPaid = async (reservation) => {
    setPaymentModalOpen(false);
    setMarkPaidLoading(true);
    try {
      const productIds = reservation.line_items.map((product) => product.product_id);
      console.log('productIds',productIds);
      console.log('orderId',reservation)
      await axios.post(`/api/orders/markAsPaid`, {
        orderId: reservation.order_id,
        productIds,
      });
      navigate(`/reservationsAdmin/${reservation.id}`);
    } catch (error) {
      console.error("Error canceling order:", error);
      setErrorMessage("Server error. Contact administrator.");
      setAlertOpen(true);
    } finally {
      setMarkPaidLoading(false);
    }
  };

  const handleCompleteProcess = async () => {
  try {
    setPaymentModalOpen(true);
  } catch (error) {
    console.error("Error in the complete process:", error);
    setErrorMessage("An error occurred during the complete process. Please try again.");
    setAlertOpen(true);
  }
};

const confirmPaymentProcess = async () => {
  try {
    const reservationData = handlePlaceOrder();
    if (reservationData) {
      const createdReservation = await handleReserve(reservationData);
      if (createdReservation) {
        await handleMarkAsPaid(createdReservation);
      }
    }
  } catch (error) {
    console.error("Error confirming payment:", error);
    setErrorMessage("An error occurred during payment confirmation. Please try again.");
    setAlertOpen(true);
  } finally {
    setPaymentModalOpen(false);
  }
};

  return (
    <>
      <Toolbar sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={() => {
            if (isAdminAuthenticated) {
              const id = JSON.parse(localStorage.getItem("shopifyId"));
              handleNavigateTo(`/reservationsAdmin/${id}`)
            } else {
              handleNavigateTo(`/reservations`)
            }
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ marginLeft: "8px" }}>
          Place new reservation
        </Typography>
      </Toolbar>
      <Box sx={{ margin: "20px" }}>
        <FormControl fullWidth sx={{ mb: 3, gap: 2 }} size="small">
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            id="location-select"
            value={location}
            label="Location"
            onChange={handleLocationChange}
            size="small"
          >
            <MenuItem value={"KZN"}>KZN</MenuItem>
            <MenuItem value={"LP"}>LP</MenuItem>
            <MenuItem value={"MP"}>MP</MenuItem>
            <MenuItem value={"NC"}>NC</MenuItem>
            <MenuItem value={"NW"}>NW</MenuItem>
            <MenuItem value={"EC"}>EC</MenuItem>
            <MenuItem value={"FS"}>FS</MenuItem>
            <MenuItem value={"GAU"}>GAU</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 3, gap: 2 }} size="small">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={category}
            label="Category"
            onChange={handleCategoryChange}
            size="small"
          >
            <MenuItem value={"All"}>All</MenuItem>
            <MenuItem value={"Men's Clothing - Second Hand"}>Men's Clothing - Brand New</MenuItem>
            <MenuItem value={"Men's Clothing - Second Hand"}>Men's Clothing - Second Hand</MenuItem>
            <MenuItem value={"Men's Clothing - Mix (New + Used)"}>Men's Clothing - Mix (New + Used)</MenuItem>
            <MenuItem value={"Women's Clothing - Brand New"}>Women's Clothing - Brand New</MenuItem>
            <MenuItem value={"Women's Clothing - Second Hand"}>Women's Clothing - Second Hand</MenuItem>
            <MenuItem value={"Women's Clothing - Mix (New + Used)"}>Women's Clothing - Mix (New + Used)</MenuItem>
            <MenuItem value={"Male Teens Clothing - Brand New"}>Male Teens Clothing - Brand New</MenuItem>
            <MenuItem value={"Male Teens Clothing - Second Hand"}>Male Teens Clothing - Second Hand</MenuItem>
            <MenuItem value={"Male Teens Clothing - Mix (New + Used)"}>Male Teens Clothing - Mix (New + Used)</MenuItem>
            <MenuItem value={"Female Teens Clothing - Brand New"}>Female Teens Clothing - Brand New</MenuItem>
            <MenuItem value={"Female Teens Clothing - Second Hand"}>Female Teens Clothing - Second Hand</MenuItem>
            <MenuItem value={"Female Teens Clothing - Mix (New + Used)"}>Female Teens Clothing - Mix (New + Used)</MenuItem>
            <MenuItem value={"Boys: Kids/Preteens Clothing - Brand New"}>Boys: Kids/Preteens Clothing - Brand New</MenuItem>
            <MenuItem value={"Boys: Kids/Preteens Clothing - Second Hand"}>Boys: Kids/Preteens Clothing - Second Hand</MenuItem>
            <MenuItem value={"Boys: Kids/Preteens Clothing - Mix (New + Used)"}>Boys: Kids/Preteens Clothing - Mix (New + Used)</MenuItem>
            <MenuItem value={"Girls: Kids/Preteens Clothing - Brand New"}>Girls: Kids/Preteens Clothing - Brand New</MenuItem>
            <MenuItem value={"Girls: Kids/Preteens Clothing - Second Hand"}>Girls: Kids/Preteens Clothing - Second Hand</MenuItem>
            <MenuItem value={"Girls: Kids/Preteens Clothing - Mix (New + Used)"}>Girls: Kids/Preteens Clothing - Mix (New + Used)</MenuItem>
            <MenuItem value={"Infant/Toddler Clothing - Brand New"}>Infant/Toddler Clothing - Brand New</MenuItem>
            <MenuItem value={"Infant/Toddler Clothing - Second Hand"}>Infant/Toddler Clothing - Second Hand</MenuItem>
            <MenuItem value={"Infant/Toddler Clothing - Mix (New + Used)"}>Infant/Toddler Clothing - Mix (New + Used)</MenuItem>
            <MenuItem value={"Mixed Bundle - Brand New"}>Mixed Bundle - Brand New</MenuItem>
            <MenuItem value={"Mixed Bundle - Second Hand"}>Mixed Bundle - Second Hand</MenuItem>
            <MenuItem value={"Mixed Bundle - Mix (New + Used)"}>Mixed Bundle - Mix (New + Used)</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select bundles for reservation
        </Typography>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              mt: 4,
              ml: '80px'
            }}
          >
            <Spinner />
          </Box>
        ) : (
          <>
            {products.length === 0 ? (
              <Typography variant="body1" sx={{ textAlign: "center", marginTop: 4 }}>
                No products currently available. Please try again later.
              </Typography>
            ) : (
              <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    selected={selectedProducts.includes(product.id)}
                    onSelect={handleSelectProduct}
                  />
                ))}
              </Box>
            )}
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2, flexDirection: "column", gap: 1 }}>
        {isAuthenticated && (
          <Button
            variant="contained"
            color="primary"
            sx={{ minWidth: "200px" }}
            onClick={() =>{
               setPaymentModalOpen(true);
               handlePlaceOrder();
            }}
          >
            Place order
          </Button>
        )}
        {isAdminAuthenticated && (
          <Button
            variant="contained"
            color="success"
            sx={{ minWidth: "200px" }}
            onClick={handleCompleteProcess}
          >
            Mark as paid
          </Button>
        )}
        </Box>
      </Box>
      <CustomAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        severity="error"
        message={errorMessage}
      />
      <ConfirmationModal
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onConfirm={confirmPaymentProcess}
        loading={markPaidLoading}
        title="Confirm Payment"
        description="Are you sure you want to mark this order as paid?"
      />
    </>
  );
};

export default AddReservation;
