import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const ProductCard = ({ product, selected, onSelect }) => {
  return (
    <Card
      onClick={() => onSelect(product.id)}
      sx={{
        width: "120px",
        margin: "5px",
        cursor: "pointer",
        backgroundColor: selected ? "rgba(33, 150, 243, 0.2)" : "white",
        boxShadow: selected ? "none" : 3,
        border: selected ? "2px solid #2196F3" : "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardContent sx={{
          padding: "8px 8px 8px 8px", // Set consistent padding
          textAlign: "center",
          "&:last-child": { paddingBottom: "8px" }, // Ensure no extra padding at the bottom
        }}>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          {product.id}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          {product.date}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50px",
            height: "50px",
            backgroundColor: "#f5f5f5",
            marginBottom: "5px",
            margin: "0 auto",
            borderRadius: "4px",
          }}
        >
          {selected ? (
            <CheckCircleIcon sx={{ color: "#2196F3" }} />
          ) : (
            <AddIcon sx={{ color: "#9e9e9e" }} />
          )}
        </Box>
        
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          {product.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          R {product.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
