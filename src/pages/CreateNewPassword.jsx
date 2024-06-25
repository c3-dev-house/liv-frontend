import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const CreateNewPassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser, login, setCurrentUser } = useAuth();

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (validatePassword(password)) {
      // Logic for updating the password
      //todo api salesforce call
      // On success:
      const updatedUser = { ...currentUser, password: password };
      console.log('updatedUser', updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      //login(currentUser.username, password);
      navigate('/');
    } else {
      // Authentication failed
      setError("Password must be at least 6 characters long, contain at least one number, and include both lower and uppercase letters.");
    }
  };

  const validatePassword = (password) => {
    //const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    //return regex.test(password);
    console.log(password);
    //return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/);
    return true;
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
        >
          Update
        </Button>
      </Box>
    </Container>
  );
};

export default CreateNewPassword;
