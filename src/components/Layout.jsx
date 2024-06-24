import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Container
} from "@mui/material";
//import MenuIcon from '@mui/material/MenuIcon'
import MenuIcon from "@mui/icons-material/Menu"; //'@mui/icons-material/Menu' vs "@material-ui/icons/Menu"
import AccountCircle from "@mui/icons-material/AccountCircle";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate 
} from "react-router-dom";

import Home from "../pages/Home.jsx";
import Profile from "../pages/Profile.jsx";
import Reservations from "../pages/Reservations/Reservations.jsx";
import ReservationDetails from "../pages/Reservations/ReservationDetails.jsx";
import AddReservation from "../pages/Reservations/AddReservation.jsx";
import ConfirmReservation from "../pages/Reservations/ConfirmReservation.jsx";
import Products from "../pages/Products/Products.jsx";
import SignIn from "../pages/SignIn.jsx";
import CreateNewPassword from "../pages/CreateNewPassword.jsx";
import { useAuth } from "../context/AuthContext"

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateTo = (path) => {
    navigate(path);
    handleClose();
  };

  const handleSignOut = () => {
    logout(); 
    navigate("/signin"); 
    handleClose(); 
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <AppBar position="static" sx={{ width: "100%" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{ cursor: 'pointer' }}
            onClick={handleNavigateHome}
          >
            LIV
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              mt: "30px",
            }}
          >
            <MenuItem onClick={() => handleNavigateTo("/profile")}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => handleNavigateTo("/reservations")}>
              Reservations
            </MenuItem>
            <MenuItem onClick={() => handleNavigateTo("/products")}>
              Products
            </MenuItem>
            <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "top",
          alignItems: "center",
          width: "100%",
          margin: "0 auto",
          overflowY: "auto",
          //maxWidth: '1200px'
        }}
      >
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/signin" />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/create-new-password" element={<CreateNewPassword />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/signin" />} />
          <Route path="/reservations" element={isAuthenticated ? <Reservations /> : <Navigate to="/signin" />} />
          <Route path="/reservations/:id" element={isAuthenticated ? <ReservationDetails /> : <Navigate to="/signin" />} />
          <Route path="/reservations/add" element={isAuthenticated ? <AddReservation /> : <Navigate to="/signin" />} />
          <Route path="/confirm-reservation" element={isAuthenticated ? <ConfirmReservation /> : <Navigate to="/signin" />} />
          <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/signin" />} />
          {/* Add other routes here */}
        </Routes>
      </Box>
    </Box>
  );
};

export default Layout;
