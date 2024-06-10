import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

const ProductEditModal = ({ open, onClose, onSubmit, initialData, isAdd }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    quantity: '',
    description: '',
    salesPrice: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        quantity: initialData.quantity,
        description: initialData.description,
        salesPrice: initialData.salesPrice,
      });
    } else {
      setFormData({
        quantity: '',
        description: '',
        salesPrice: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedData = {
      ...formData,
      date: new Date().toISOString().split('T')[0], // Automatically set date
    };
    onSubmit(updatedData);
  };

  const handleReset = () => {
    setFormData({
      quantity: '',
      description: '',
      salesPrice: '',
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& .MuiDialog-paper': {
          margin: 0,
          position: 'relative',
          top: 0,
          left: -5,
          transform: 'none',
        },
      }}>
      <DialogTitle>{initialData ? 'Edit sold item' : 'Add sold items'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="quantity"
          label="Quantity"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.quantity}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="salesPrice"
          label="Item price"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.salesPrice}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        {isAdd && (
          <Button onClick={handleReset} color="secondary">
            Reset
          </Button>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {initialData && (
            <IconButton color="primary">
              <DeleteIcon />
            </IconButton>
          )}
          <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: theme.palette.blue.main, color: 'white' }}>
          {isAdd ? 'Add' : 'Update'}
        </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ProductEditModal;
