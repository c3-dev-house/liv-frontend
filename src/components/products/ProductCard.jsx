import React, { useState,useEffect } from "react";
import axios from "../../axiosConfig";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

import ProductEditModal from "../products/ProductEditModal";

import { useTheme } from '@mui/material/styles';

const ProductCard = ({ product, onAddItem, onEditItem, onDeleteItem,setClothingBundleId}) => {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete,setIsDelete]=useState(false);

  useEffect(() => {
    if (isDelete && editItem) {
      onDeleteItem(editItem.Id);
      setIsDelete(false);
      handleCloseModal();
    }
  }, [isDelete, editItem, onDeleteItem]);

  const theme = useTheme();

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleOpenModal = (item = null) => {
    setEditItem(item);
    setIsAdd(item === null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditItem(null);
  };

  const handleSubmitModal = (updatedItem) => {
    if (isAdd) {
      onAddItem(product, updatedItem);
    } else {
      onEditItem(editItem.Id, updatedItem);
      // console.log("Edit Item, ", editItem);
    }
    handleCloseModal();
  };

  const totalSalesPrice = (product.items || []).reduce(
    (acc, item) => acc + item.Sales_Price__c * item.Quantity__c,
    0
);

  const costPrice = product.price|| 0; // Assuming there's a fallback cost price if it's undefined
  
  const profit = totalSalesPrice - costPrice;
  const profitDisplay =
      profit >= 0 ? `R ${profit.toFixed(2)}` : `(${Math.abs(profit).toFixed(2)})`;

  // console.log("Total Sales Price:", totalSalesPrice);
  // console.log("Profit:", profit);
  // console.log("Profit Display:", profitDisplay);

  function formatDate(originalDateTime) {
    // Parse the original date-time string
    const parsedDate = new Date(originalDateTime);
  
    // Extract year, month, and day components
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(parsedDate.getDate()).padStart(2, '0');
  
    // Construct the formatted date string in yyyy-mm-dd format
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }
/*
  const findClothingBundleId = async (productId) => {
    const clothingBundle = await axios.get(`/api/products/owned-products`);
    let clothingBundleData = clothingBundle.data;

    const product = clothingBundleData.find(bundle => bundle.id === productId);
    if (product) {
      setClothingBundleId(product.clothingBundlesId)
      return product.clothingBundlesId;
    } else {
      throw new Error(`Product with ID ${productId} not found.`);
    }
  };
  */
  
  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleExpand}
        sx={{ width: "100%", mb: 2 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            "& .MuiAccordionSummary-expandIconWrapper": { marginLeft: "16px" },
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography variant="body2">
              {product.orderDate} {product.orderTime}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>{product.title}</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                Profit:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  textAlign: "right",
                  color: profit >= 0 ? theme.palette.green.main : theme.palette.error.main,
                }}
              >
                {profitDisplay}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                Cost price:
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "right" }}>
                R {product.price.toFixed(2)}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                Total Sales Price:
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "right" }}>
                R {totalSalesPrice.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography variant="body1">Items sold</Typography>
            {product.items.map((item) => (
              <Box
                key={item.Id}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                  py: 0,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ flex: "1 1 25%", textAlign: "left", fontSize: { xs: '0.65rem', sm: '0.65rem', lg: '0.65rem' }}}
                >
                  {formatDate(item.CreatedDate)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ flex: "1 1 45%", textAlign: "left" ,  ml: 1, fontSize: { xs: '0.65rem', sm: '0.65rem', lg: '0.65rem' }}}
                >
                  {item.Quantity__c} {item.Description__c}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ flex: "1 1 35%", textAlign: "right",  ml: 1, fontSize: { xs: '0.65rem', sm: '0.65rem', lg: '0.65rem'} }}
                >
                  R {item.Sales_Price__c}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => handleOpenModal(item)}
                  sx={{ ml: 0.5 }}
                >
                  <EditIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              sx={{ mt: 2, backgroundColor: theme.palette.green.main, color: 'white' }} 
              onClick={() => {
                handleOpenModal(null)
                //findClothingBundleId(product.id)
              }
              }
            >
              Add Item
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <ProductEditModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
        initialData={editItem}
        isAdd={isAdd}
        setIsDelete={setIsDelete}
      />
    </>
  );
};

export default ProductCard;
