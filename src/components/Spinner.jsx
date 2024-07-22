import React from 'react';
import { Box } from '@mui/material';
import '../components/Spinner.css';

const Spinner = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        backgroundColor: "rgba(255, 255, 255, 0)", 
        zIndex: 9999, 
        marginTop: "80px",
        justifyContent: "center",
        alignItems: "top",
        position: 'relative',
      }}
    >
      <div className="spinner">
        <div className="circle orange"></div>
        <div className="circle yellow"></div>
        <div className="circle lime"></div>
        <div className="circle green"></div>
        <div className="circle blue"></div>
        <div className="circle lightblue"></div>
        <div className="circle purple"></div>
        <div className="circle red"></div>
      </div>
    </Box>
  );
};

export default Spinner;
