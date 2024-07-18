import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
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
import ForgotPassword from "../pages/ForgotPassword.jsx";
import { useAuth } from "../context/AuthContext";
import Beneficiaries from "../pages/Admin/Beneficiaries.jsx";
import ReservationsAdmin from "../pages/Reservations/ReservationsAdmin.jsx";
import BrandLineComponent from "./BrandLineComponent";

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, isAdminAuthenticated, logout, checkAuth,getSalesforceId} = useAuth();
  // const { isAuthenticated, isAdminAuthenticated, logout, checkAuth} = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(isAdminAuthenticated)
    console.log(getSalesforceId());
    const timeout = async () => {
      checkAuth()
      // Assume this function checks if the user is authenticated
      // and updates the isAuthenticated state in useAuth context
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
      setLoading(false);
    };
    timeout();
    //checkAuth()
  }, []);
  

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigateHome = () => {
    navigate("/");
  };

  const handleNavigateTo = async (path) => {
    if (typeof path === "function") {
      const resolvedPath = await path();
      navigate(resolvedPath);
    } else {
      navigate(path);
    }
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
      <AppBar
        position="static"
        sx={{ width: "100%", backgroundColor: "black", height: "65px" }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h6"
              sx={{ cursor: "pointer" }}
              onClick={handleNavigateHome}
            >
              Umthombo Marketplace
            </Typography>
            <BrandLineComponent />
          </Box>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          {isAuthenticated && (
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
          )}
          {isAdminAuthenticated && (
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
              <MenuItem onClick={() => handleNavigateTo("/allBeneficiaries")}>
                Beneficiaries
              </MenuItem>
              <MenuItem onClick={() => handleNavigateTo(async () => `/reservationsAdmin/${await getSalesforceId()}`)}>
                Reservations
              </MenuItem>
              {/* <MenuItem onClick={() => handleNavigateTo(`/reservations`)}>
                Reservations
              </MenuItem> */}
              <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
            </Menu>
          )}
        </Toolbar>
      </AppBar>
      {loading ? ( ///LOADER
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
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
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
          }}
        >
          <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/signin" />} />
            <Route path="/allBeneficiaries" element={ <Beneficiaries />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/create-new-password"
              element={<CreateNewPassword />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={isAuthenticated || isAdminAuthenticated ? <Profile /> : <Navigate to="/signin" />} />
            <Route path="/reservations" element={isAuthenticated ? <Reservations /> : <Navigate to="/signin" />} />
            <Route path="/reservationsAdmin/:id" element={isAuthenticated || isAdminAuthenticated ?<ReservationsAdmin />: <Navigate to="/signin" />}/>
            <Route path="/reservations/:id" element={isAuthenticated || isAdminAuthenticated ? <ReservationDetails /> : <Navigate to="/signin" />} />
            <Route path="/reservations/add" element={isAuthenticated || isAdminAuthenticated ? <AddReservation /> : <Navigate to="/signin" />} />
            <Route path="/confirm-reservation" element={isAuthenticated  || isAdminAuthenticated ? <ConfirmReservation /> : <Navigate to="/signin" />} />
            <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/signin" />} />
          </Routes>
        </Box>
      )}
    </Box>
  );
};

export default Layout;
