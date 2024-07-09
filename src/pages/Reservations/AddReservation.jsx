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
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProductCard from "../../components/reservations/ProductCard";
import { useAuth } from "../../context/AuthContext";

const AddReservation = ({ onBack }) => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [location, setLocation] = useState("KZN");
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState("7024877994031");
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const vendor = "KZN"; // fixed for now - todo: add category select? //or mvp2ish
        const response = await axios.get(`/api/products/vendor-products?vendor=${vendor}`);
        console.log('Fetched products:', response.data);

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
          console.log("activeProducts");
          console.log(activeProducts);
        setProducts(activeProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleNavigateTo = (path) => {
    navigate(path);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handlePlaceOrder = () => {
    const customerId = currentUser.Shopify_Id__c;
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
    console.log("reservation", reservation);
    navigate("/confirm-reservation", { state: { reservation } });
  };

  return (
    <>
      <Toolbar sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={() => handleNavigateTo("/reservations")}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{ marginLeft: "8px" }}>
          Place new reservation
        </Typography>
      </Toolbar>
      <Box sx={{ padding: "20px" }}>
        <FormControl fullWidth sx={{ mb: 3 }} size="small">
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
            <MenuItem value={"LIV Cape Town"}>LIV Cape Town</MenuItem>
            <MenuItem value={"LIV Johannesburg"}>LIV Johannesburg</MenuItem>
          </Select>
        </FormControl>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Select bundles for reservation
        </Typography>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selected={selectedProducts.includes(product.id)}
              onSelect={handleSelectProduct}
            />
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ minWidth: "200px" }}
          onClick={handlePlaceOrder}
        >
          Place order
        </Button>
      </Box>
      </Box>
    </>
  );
};

export default AddReservation;
