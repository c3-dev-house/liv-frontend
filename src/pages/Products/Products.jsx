import React, { useState } from "react";
import { Typography, Box, Container, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductsHeader from "../../components/products/ProductsHeader";
import ProductCard from "../../components/products/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([
    {
      date: "15/05/2025",
      time: "08:45:15am",
      title: "Babies Clothes Bundle",
      costPrice: 300.0,
      items: [
        {
          id: 1,
          date: "2024/05/16",
          quantity: 1,
          description: "White shirt",
          salesPrice: 56.0,
        },
        {
          id: 2,
          date: "2024/05/16",
          quantity: 2,
          description: "One piece",
          salesPrice: 50.0,
        },
        {
          id: 3,
          date: "2024/05/16",
          quantity: 1,
          description: "Hat",
          salesPrice: 50.0,
        },
        {
          id: 4,
          date: "2024/05/16",
          quantity: 8,
          description: "Socks",
          salesPrice: 10.0,
        },
        {
          id: 5,
          date: "2024/05/16",
          quantity: 1,
          description: "Comforter",
          salesPrice: 70.0,
        },
      ],
    },
    {
      date: "20/06/2025",
      time: "10:30:45am",
      title: "Male Clothes Bundle",
      costPrice: 300.00,
      items: [
        {
          id: 1,
          date: "2025/05/20",
          quantity: 3,
          description: "T-Shirt", 
          salesPrice: 25.00,
        },
        {
          id: 2,
          date: "2025/05/20",
          quantity: 1,
          description: "Shorts",
          salesPrice: 45.00,
        },
        {
          id: 3,
          date: "2025/05/20",
          quantity: 1,
          description: "Jacket",
          salesPrice: 120.00,
        },
        {
          id: 4,
          date: "2025/05/20",
          quantity: 1,
          description: "Sandals",
          salesPrice: 30.00,
        },
        {
          id: 5,
          date: "2025/05/20",
          quantity: 1,
          description: "Hat",
          salesPrice: 60.0,
        },
      ],
    }
    
  ]);

  const handleSortProducts = () => {
    console.log("sort clicked");
  };

  const handleFilterProducts = () => {
    console.log("filter clicked");
  };

  const handleAddItem = (product, newItem) => {
    const maxId = product.items.length ? Math.max(...product.items.map(item => parseInt(item.id, 10))) : 0;
    const newId = maxId + 1;
    newItem.id = newId;
    console.log('add item clicked');
    console.log(product);
    console.log(newItem);
  };

  const handleEditItem = (product, updatedItem) => {
    console.log('edit item clicked');
    console.log(product);
    console.log(updatedItem);
    //post query item id = id -> 
  };

  return (
    <Container
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      p: 2,
      maxWidth: "lg",
    }}
    >
      <ProductsHeader
        title="Products"
        onBack={() => window.history.back()}
        onSort={handleSortProducts}
        onFilter={handleFilterProducts}
      />
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {products.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <ProductCard
              product={product}
              onAddItem={handleAddItem}
              onEditItem={handleEditItem}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
