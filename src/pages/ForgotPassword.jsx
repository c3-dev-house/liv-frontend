// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, CircularProgress  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useAuth } from '../context/AuthContext';
import CustomAlert from "../components/CustomAlert";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const [alertOpen, setAlertOpen] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();
  

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (validatePassword(newPassword)) {
      try {
        // Call the forgotPassword API endpoint
        const response = await axios.post('/api/auth/forgot-password', {
          username,
          email,
          newPassword,
        });

        const { user, token } = response.data;

        // Update user in local storage and context
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setCurrentUser(user);

        // Navigate to home page after successful password reset
        navigate('/');
      } catch (error) {
        console.error('Password reset failed', error);
        setErrorMessage('Failed to reset password. Please try again.');
        setAlertOpen(true);
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      setError("Password must be at least 6 characters long, contain at least one number, and include both lower and uppercase letters.");
      setLoading(false);
    }

  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return regex.test(password);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        p: 2,
      }}
    >
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
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ alignSelf: "flex-start", mb: 2 }}>
          Forgot Password
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ width: "100%" }}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ width: "100%" }}
        />
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          sx={{ width: "100%" }}
        />
        {error && (
          <Typography color="error" sx={{ mt: 1, width: "100%", textAlign: "center" }}>
            {error}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mt: 2,
            width: "100%",
            p: 2,
            bgcolor: "background.default",
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Typography variant="body2" color="error" sx={{ fontWeight: "bold" }}>
            * A valid password contains:
          </Typography>
          <ul>
            <li><Typography variant="body2">at least 6 characters,</Typography></li>
            <li><Typography variant="body2">including at least one number,</Typography></li>
            <li><Typography variant="body2">and includes both lower and uppercase letters.</Typography></li>
          </ul>
        </Box>
        <Button
          type="submit"
          onClick={handleForgotPassword}
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: "100%" }}
          disabled={loading} 
        >
          {loading ? <CircularProgress size={24} /> : "Reset Password"} 
        </Button>
      </Box>
      <CustomAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        severity="error"
        message={errorMessage}
      />
    </Container>
  );
};

export default ForgotPassword;
