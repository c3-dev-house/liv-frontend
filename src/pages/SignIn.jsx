// src/pages/SignIn.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
/*
const dummyUsers = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];
*/

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  

  const handleSignIn = () => {
    if (login(username, password)) {
      // Authentication successful
      navigate('/');
    } else {
      // Authentication failed
      setError("Invalid username or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: "100vh",
        p: 3,
        bgcolor: "background.paper",
      }}
    >
      <Box sx={{ alignSelf: "flex-start", mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Sign in
        </Typography>
      </Box>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Link href="#" variant="body2" sx={{ mt: 1 }}>
        Forgot your password..?
      </Link>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSignIn}
      >
        Sign in
      </Button>
    </Box>
  );
};

export default SignIn;
