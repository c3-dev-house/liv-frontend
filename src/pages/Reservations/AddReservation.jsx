import React, { useState } from "react";
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

const dummyProducts = [
  {
    id: "B-0001",
    title: "Men's clothes bundle",
    date: "20/05/2024",
    price: 300,
    location: "LIV DBN",
  },
  {
    id: "B-0002",
    title: "Babies clothes bundle",
    date: "20/05/2024",
    price: 300,
    location: "LIV DBN",
  },
  {
    id: "B-0003",
    title: "Young male clothes bundle",
    date: "20/05/2024",
    price: 300,
    location: "LIV DBN",
  },
  {
    id: "B-0004",
    title: "Women's clothes bundle",
    date: "20/05/2024",
    price: 300,
    location: "LIV DBN",
  },
  {
    id: "B-0005",
    title: "Young female clothes bundle",
    date: "20/05/2024",
    price: 300,
    location: "LIV DBN",
  },
  {
    id: "B-0006",
    title: "Men's clothes bundle",
    date: "20/05/2024",
    price: 300,
    location: "LIV DBN",
  },
];

const AddReservation = ({ onBack }) => {
  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [location, setLocation] = useState("KZN");

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
    const reservation = {
      location,
      contents: dummyProducts
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
          {dummyProducts.map((product) => (
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
