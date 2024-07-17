import React from 'react';
import { Toolbar, IconButton, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AdminReservationsHeader = ({ title, onBack }) => {
  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'start', width: '100%'}}>
      <IconButton edge="start" color="inherit" aria-label="back" onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6">{title}</Typography>
     
    </Toolbar>
  );
};

export default AdminReservationsHeader;
