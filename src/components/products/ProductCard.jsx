import React, { useState } from "react";
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

const ProductCard = ({ product, onAddItem, onEditItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [isAdd, setIsAdd] = useState(false);


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
      onEditItem(product, updatedItem);
    }
    handleCloseModal();
  };

  const totalSalesPrice = product.items.reduce(
    (acc, item) => acc + item.salesPrice * item.quantity,
    0
  );
  const profit = totalSalesPrice - product.costPrice;
  const profitDisplay =
    profit >= 0 ? `R ${profit.toFixed(2)}` : `(${Math.abs(profit).toFixed(2)})`;

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
              {product.date} {product.time}
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
                Cost price:
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "right" }}>
                R {product.costPrice.toFixed(2)}
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
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography variant="body1">Items sold</Typography>
            {product.items.map((item) => (
              <Box
                key={item.id}
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
                  {item.date}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ flex: "1 1 45%", textAlign: "left" ,  ml: 1, fontSize: { xs: '0.65rem', sm: '0.65rem', lg: '0.65rem' }}}
                >
                  {item.quantity} {item.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ flex: "1 1 35%", textAlign: "right",  ml: 1, fontSize: { xs: '0.65rem', sm: '0.65rem', lg: '0.65rem'} }}
                >
                  R {item.salesPrice.toFixed(2)}
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
              onClick={() => handleOpenModal(null)}
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
      />
    </>
  );
};

export default ProductCard;
