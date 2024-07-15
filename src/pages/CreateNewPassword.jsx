import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Grid, CircularProgress  } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import axios from "../axiosConfig";
import CustomAlert from "../components/CustomAlert";

const CreateNewPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const [alertOpen, setAlertOpen] = useState(false); 
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useAuth();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (validatePassword(password)) {
      try {
        // Call the resetPassword API endpoint
        const response = await axios.post('/api/auth/reset-password', {
          username: currentUser.Username__c,
          oldPassword: oldPassword, // This should be handled securely
          newPassword: password,
        });

        const { user, token } = response.data;

        // Update user in local storage and context
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        setCurrentUser(user);

        // Navigate to home page after successful password update
        navigate('/');
      } catch (error) {
        console.error('Password update failed', error);
        setErrorMessage('Failed to update password. Please try again.');
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
    //console.log(password);
    //return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/);
    //return true;
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
        //component="form"
        //onSubmit={handleUpdatePassword}
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
          Create new password
        </Typography>
        <TextField
          label="Old password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          sx={{ width: "100%" }}
        />
        <TextField
          label="New password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          onClick={handleUpdatePassword}
          variant="contained"
          color="primary"
          sx={{ mt: 2, width: "100%" }}
          disabled={loading} 
        >
          {loading ? <CircularProgress size={24} /> : "Update"} 
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

export default CreateNewPassword;
