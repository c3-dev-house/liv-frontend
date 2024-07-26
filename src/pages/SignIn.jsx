// src/pages/SignIn.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Grid, CircularProgress,Link } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import CustomAlert from "../components/CustomAlert";
import axios from "../axiosConfig";

/*
const dummyUsers = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

*/
//const DUMMY_PASSWORD = "Liv123";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameInfo,setUsernameInfo]=useState(false);
  const [passwordInfo,setPasswordInfo]=useState(false);
  const [loading, setLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();
  const { login, adminLogin} = useAuth();
  

  const handleSignIn = async () => {
    // Clear previous errors
    setError("");
    setLoading(true);
    // Validate inputs
    if (!validateUsername(username) ||!validatePassword(password) ) {
      setError("Invalid username or password");
      setLoading(false);
      return;
    }

  try {
    const response = await login(username, password);
    if (response.success) {
      if (response.needsPasswordReset) {
        navigate('/create-new-password');
      } else {
        navigate('/');
      }
    } else {
      setError("Invalid username or password");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    setErrorMessage("Error signing in. Please try again."); 
    setAlertOpen(true); 
  } finally {
    setLoading(false); 
  }
};

const handleAdminSignIn = async () => {
  // Clear previous errors
  setError("");
  setAdminLoading(true);
  // Validate inputs
  if (!validateUsername(username) || !validatePassword(password)) {
    setError("Invalid username or password");
    setLoading(false);
    return;
  }

  try {
    const response = await adminLogin(username, password);
    if (response.success) {
      navigate('/allBeneficiaries');
    } else {
      setError("Invalid username or password");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    setErrorMessage("Error signing in. Please try again."); 
    setAlertOpen(true); 
  } finally {
    setAdminLoading(false);
  }
};



  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };
  const validateUsername = (username) => {
      const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    return usernameRegex.test(username);
  }

  const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
      return passwordRegex.test(password);
  }

  return (
    <Container
      maxWidth={true}
      disableGutters={true}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        height: "100vh",
        width: "100%",
        maxWidth:"400px",
        p: 3,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ alignSelf: "flex-start", mb: 2 }}>
        Sign in
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
              bgcolor: "background.paper",
              borderRadius: 1,
              boxShadow: 1,
              width: "100%",
              //minWidth: "100%"
            }}
          >
            <div style={{ width: "100%",maxWidth:'400px' }}>
              <div style={{display:"flex", flexDirection:"row", alignItems:"center", columnGap:"5px"}}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ width: "100%" }}
                />
                <InfoOutlined onClick={()=>setUsernameInfo(!usernameInfo)} style={{color:"gray"}} />
              </div>

              {usernameInfo && (
                <div style={{ fontStyle: "italic", fontSize:"x-small", color: "gray"}}>Minimum 3 characters</div>
              )}
            </div>
            <div style={{ width: "100%",maxWidth:'400px'}}>
              <div style={{display:"flex", flexDirection:"row", alignItems:"center",columnGap:"5px"}}>
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ width: "100%" }}
                />
                <InfoOutlined onClick={() => setPasswordInfo(!passwordInfo)} style={{ backgroundColor:passwordInfo? "rgb(220, 220, 220)" : "",borderRadius:"100px", color: "gray" }} />
              </div>

              {passwordInfo && (
                <div style={{ fontStyle: "italic", fontSize:"x-small", color: "gray"}}>
                  Minimum 6 characters long, 1 uppercase letter and 1 number
                </div>
              )}
            </div>
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Link
              onClick={handleForgotPassword}
              variant="body2"
              sx={{ mt: 1, alignSelf: "flex-start", width: "100%", cursor: "pointer" }}
            >
              Forgot your password..?
            </Link>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: "100%",maxWidth:'400px'}}
              onClick={handleSignIn}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Sign in"} 
            </Button>
            <Button
              variant="contained"
              color="info"
              sx={{ mt: 2, width: "100%",maxWidth:'400px' }}
              onClick={handleAdminSignIn}
              disabled={loading}
            >
              {adminLoading ? <CircularProgress size={24} /> : "Admin Sign in"} 
            </Button>
            <Button
              sx={{
                mt:2,
                width:'100%',
                boxShadow: 1,
                maxWidth: '400px',
                bgcolor: '#36BA98', // Custom background color
                color: '#FFFFFF',   // Custom text color
                '&:hover': {
                  bgcolor: '#219C90', // Custom hover background color
                },
              }}
              onClick={() => navigate('/register')} 
            >
              Apply Now
            </Button>
          </Box>
        </Grid>
      </Grid>
      <CustomAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        severity="error"
        message={errorMessage}
      />
      {/* <br/>
      <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
        
      </div> */}
    </Container>
    
  );
};

export default SignIn;
