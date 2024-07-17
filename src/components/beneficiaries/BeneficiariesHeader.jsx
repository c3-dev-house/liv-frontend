import React, { useState } from "react";
import { Toolbar, IconButton, Typography, Button} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchForm from '../generalComponents/SearchForm';

const BeneficiariesHeader = ({ title, onBack, onAdd,searchTerm,setSearchTerm  }) => {
  return (
      <div style={{display:'flex', flexDirection:'column'}}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={onBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
        <SearchForm
          placeholder="Search…" 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
        />
      </div>
  );
};

export default BeneficiariesHeader;
