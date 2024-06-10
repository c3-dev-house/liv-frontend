import React from 'react';
import { Toolbar, IconButton, Typography, Button, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import FilterIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';


const ProductsHeader = ({ title, onBack, onSort, onFilter }) => {
  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <IconButton edge="start" color="inherit" aria-label="back" onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6">{title}</Typography>
      <Box>
      {onSort && (
         <IconButton color="secondary" aria-label="sort products" onClick={onSort}>
         <SortIcon />
       </IconButton>
      )}
      {onFilter && (
         <IconButton color="secondary" aria-label="filter products" onClick={onFilter}>
         <FilterIcon />
       </IconButton>
      )}
      </Box>
    </Toolbar>
  );
};

export default ProductsHeader;
