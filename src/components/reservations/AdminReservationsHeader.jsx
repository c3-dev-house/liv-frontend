import React from 'react';
import { Toolbar, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

const AdminReservationsHeader = ({ title, onBack,onAdd }) => {
  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'start', width: '100%'}}>
      <IconButton edge="start" color="inherit" aria-label="back" onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6">{title}</Typography>
      {onAdd && (
         <IconButton color="secondary" aria-label="add reservation" onClick={onAdd}>
         <AddIcon />
       </IconButton>
      )}
    </Toolbar>
  );
};

export default AdminReservationsHeader;
