import React, { useState,useEffect } from "react";
import axios from "../../axiosConfig";
import { Typography, Box, Container, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductsHeader from "../../components/products/ProductsHeader";
import ProductCard from "../../components/products/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [clothingBundleId,setClothingBundleId]=useState('');

  useEffect(() => {
    const fetchBeneficiarySales = async () => {
      try {
        const customerId = "7024877994031"; // hardcoded on Grace for now
        // const response = await axios.get(`/api/products/owned-products/${customerId}`);
        const response = await axios.get(`/api/products/owned-products`);
        // console.log('Fetched products:', response.data);

        const { orders } = response.data;
        const soldProducts = response.data.map(product => ({
          id: product.id,
          title: product.title,
          price: product.price,
          createdAt: product.items.createdAt, //undefined
          location: product.location,
          orderDate: product.date,
          orderTime: product.time,
          items: product.items
        }));
          // console.log("soldProducts");
          // console.log(soldProducts);
          setProducts(soldProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchBeneficiarySales();
  }, [fetchTrigger]);
  const handleSortProducts = () => {
    console.log("sort clicked");
  };

  const handleFilterProducts = () => {
    console.log("filter clicked");
  };

  const handleAddItem = async (product, newItem) => {
    const maxId = product.items.length ? Math.max(...product.items.map(item => parseInt(item.id, 10))) : 0;
    const newId = maxId + 1;
    newItem.id = newId;
    // let clothingBundleId = product.items[0].Clothing_Bundles_Id__c;
    // const clothingBundle = await axios.get(`/api/products/owned-products`);
    // let clothingBundleId = clothingBundle.data[0].clothingBundlesId;

    const response = await axios.post(`/api/items/addItem/${clothingBundleId}`,newItem);
    // console.log('Fetched products:', response.data);
    // console.log('add item clicked');

    // console.log(newItem);
    // Trigger re-fetch
    setFetchTrigger(prev => !prev);
  };

  const handleEditItem = async (item, updatedItem) => {
    await axios.patch(`/api/items/updateItem/${item}`,updatedItem);
    // console.log('edit item clicked');
    // console.log(item);
    // console.log(updatedItem);
    // Trigger re-fetch
    setFetchTrigger(prev => !prev);
  };
  const handleDeleteItem = async (item) => {
    await axios.delete(`/api/items/deleteItem/${item}`);
    // console.log('delete item clicked');
    // console.log(item);
    // Trigger re-fetch
    setFetchTrigger(prev => !prev);
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
              onDeleteItem={handleDeleteItem}
              setClothingBundleId={setClothingBundleId}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;
