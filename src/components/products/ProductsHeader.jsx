import React, {useState} from 'react';
import { Toolbar, IconButton, Typography, Button,  Menu, MenuItem, Box  } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import FilterIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';


const ProductsHeader = ({ title, onBack, onSort, onFilter, sortCriteria, filterCriteria }) => {
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleSortClose = (criteria) => {
    setSortAnchorEl(null);
    if (criteria !== undefined) {
      onSort(criteria);
    }
  };

  const handleFilterClose = (criteria) => {
    setFilterAnchorEl(null);
    if (criteria !== undefined) {
      onFilter(criteria);
    }
  };

  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <IconButton edge="start" color="inherit" aria-label="back" onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6">{title}</Typography>
      <Box>
        <IconButton color={sortCriteria ? 'primary' : 'secondary'} aria-label="sort products" onClick={handleSortClick}>
          <SortIcon />
        </IconButton>
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={() => handleSortClose(undefined)}
        >
          <MenuItem onClick={() => handleSortClose('dateAsc')}>Date Ascending</MenuItem>
          <MenuItem onClick={() => handleSortClose('dateDesc')}>Date Descending</MenuItem>
          <MenuItem onClick={() => handleSortClose('profitAsc')}>Profit Ascending</MenuItem>
          <MenuItem onClick={() => handleSortClose('profitDesc')}>Profit Descending</MenuItem>
          <MenuItem onClick={() => handleSortClose('')}>None</MenuItem>
        </Menu>
        <IconButton color={filterCriteria ? 'primary' : 'secondary'} aria-label="filter products" onClick={handleFilterClick}>
          <FilterIcon />
        </IconButton>
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={() => handleFilterClose(undefined)}
        >
          <MenuItem onClick={() => handleFilterClose('hasItems')}>Has Items</MenuItem>
          <MenuItem onClick={() => handleFilterClose('noItems')}>No Items</MenuItem>
          <MenuItem onClick={() => handleFilterClose('')}>None</MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  );
};

export default ProductsHeader;
