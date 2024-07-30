import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import { Typography, Box, Container, CircularProgress, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductsHeader from "../../components/products/ProductsHeader";
import ProductCard from "../../components/products/ProductCard";
import { useAuth } from "../../context/AuthContext";
import ConfirmationModal from "../../components/ConfirmationModal";
import CustomAlert from "../../components/CustomAlert";
import Spinner from "../../components/Spinner";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const [clothingBundleId, setClothingBundleId] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingLoading, setUpdatingLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeProductCard,setActiveProductCard]=useState({});

  useEffect(() => {
    const fetchBeneficiarySales = async () => {
      console.log('activeProductCard',activeProductCard)
      setLoading(true);
      try {
        //const customerId = "7024877994031"; // hardcoded on Grace for now // Shopify_Id__c in user object
        const customerId = currentUser.Shopify_Id__c;
        const response = await axios.get(`/api/products/owned-products/${customerId}`);
        //const response = await axios.get(`/api/products/owned-products`); - used for hardcoded custId
        // console.log('Fetched products:', response.data);
        // console.log("Response",response);
        //const { orders } = response.data;
        const soldProducts = response.data.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price,
          createdAt: product.items[0].CreatedDate, //undefined?
          location: product.location,
          orderDate: product.date,
          orderTime: product.time,
          items: product.items,
          bodyHtml: product.body_html
        }));
         console.log("soldProducts", soldProducts);
        setProducts(soldProducts);
        setFilteredProducts(soldProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrorMessage("Error fetching products. Please try again.");
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiarySales();
  }, [fetchTrigger]);

  useEffect(() => {
    applyFiltersAndSorting(products);
  }, [sortCriteria, filterCriteria]);

  const applyFiltersAndSorting = () => {
    let updatedProducts = [...products];

    // Apply filtering
    if (filterCriteria) {
      if (filterCriteria === "hasItems") {
        updatedProducts = updatedProducts.filter(
          (product) => product.items && product.items.length > 0
        );
      } else if (filterCriteria === "noItems") {
        updatedProducts = updatedProducts.filter(
          (product) => !product.items || product.items.length === 0
        );
      }
    }

    // Apply sorting
    if (sortCriteria) {
      updatedProducts = updatedProducts.sort((a, b) => {
        const dateTimeA = new Date(`${a.orderDate.split('/').reverse().join('-')}T${a.orderTime}`);
        const dateTimeB = new Date(`${b.orderDate.split('/').reverse().join('-')}T${b.orderTime}`);
        if (sortCriteria === "dateAsc") {
          return dateTimeA - dateTimeB;
        }
        if (sortCriteria === "dateDesc") {
          return dateTimeB - dateTimeA;
        }
        if (sortCriteria === "profitAsc") {
          const profitA =
            a.items.reduce(
              (acc, item) => acc + item.Sales_Price__c * item.Quantity__c,
              0
            ) - a.price;
          const profitB =
            b.items.reduce(
              (acc, item) => acc + item.Sales_Price__c * item.Quantity__c,
              0
            ) - b.price;
          return profitA - profitB;
        }
        if (sortCriteria === "profitDesc") {
          const profitA =
            a.items.reduce(
              (acc, item) => acc + item.Sales_Price__c * item.Quantity__c,
              0
            ) - a.price;
          const profitB =
            b.items.reduce(
              (acc, item) => acc + item.Sales_Price__c * item.Quantity__c,
              0
            ) - b.price;
          return profitB - profitA;
        }
        return 0;
      });
    }

    setFilteredProducts(updatedProducts);
  };

  const handleSortProducts = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleFilterProducts = (criteria) => {
    setFilterCriteria(criteria);
  };

  const handleAddItem = async (product, newItem) => {
    setUpdatingLoading(true);
    try {
      const maxId = product.items.length ? Math.max(...product.items.map((item) => parseInt(item.id, 10))) : 0;
      const newId = maxId + 1;
      newItem.id = newId;
      // console.log(product);
      // console.log(clothingBundleId);
      // setClothingBundleId(product.items[0].Clothing_Bundles_Id__c);
      // const clothingBundleId = product.items[0].Clothing_Bundles_Id__c;

      await axios.post(`/api/items/addItem/${clothingBundleId}`, newItem);
      setFetchTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error adding item:", error);
      setErrorMessage("Error adding item. Please try again.");
      setAlertOpen(true);
    } finally {
      setUpdatingLoading(false);
    }
  };

  const handleEditItem = async (item, updatedItem) => {
    setUpdatingLoading(true);
    try {
      await axios.patch(`/api/items/updateItem/${item}`, updatedItem);
      setFetchTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error editing item:", error);
      setErrorMessage("Error editing item. Please try again.");
      setAlertOpen(true);
    } finally {
      setUpdatingLoading(false);
    }
  };


  const handleDeleteItem = (item) => {
    setItemToDelete(item);
    setIsModalOpen(true);
  };

  const confirmDeleteItem = async () => {
    setUpdatingLoading(true);
    setIsModalOpen(false);
    try {
      await axios.delete(`/api/items/deleteItem/${itemToDelete}`);
      setFetchTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error deleting item:", error);
      setErrorMessage("Error deleting item. Please try again.");
      setAlertOpen(true);
    } finally {
      setUpdatingLoading(false);
    }
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
        sortCriteria={sortCriteria}
        filterCriteria={filterCriteria}
      />
      {loading ? (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", mt:4,ml:'60px'}}>
            <Spinner />
          </Box>
        </>
      ) : filteredProducts.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 2 }}>No products to display at this stage.</Typography>
      ) : (
        <Grid container spacing={2} sx={{ width: "100%", mt: 2 }}>
          {filteredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ProductCard
                product={product}
                onAddItem={handleAddItem}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteItem}
                setClothingBundleId={setClothingBundleId}
                activeProductCard={activeProductCard}
                setActiveProductCard={setActiveProductCard}
                updatingLoading={updatingLoading}
              />
            </Grid>
          ))}
        </Grid>
      )}
      <ConfirmationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteItem}
        title="Delete Item"
        description="Are you sure you want to delete this item?"
      />
       <CustomAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        severity="error"
        message={errorMessage}
      />
    </Container>
  );
};

export default Products;
