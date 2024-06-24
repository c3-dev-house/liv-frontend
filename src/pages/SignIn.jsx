// src/pages/SignIn.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link, Container, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
/*
const dummyUsers = [
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

*/
const DUMMY_PASSWORD = "Liv123";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  

  const handleSignIn = () => {
    if (login(username, password)) {
      // Check if the password is the dummy password
      if (password === DUMMY_PASSWORD) {
        // Redirect to create new password page
        navigate('/create-new-password');
      } else {
        // Authentication successful
        navigate('/');
      }
    } else {
      // Authentication failed
      setError("Invalid username or password");
    }
  };

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
        p: 5,
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
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "100%" }}
            />
            {error && (
              <Typography color="error" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Link href="#" variant="body2" sx={{ mt: 1, alignSelf: "flex-start", width: "100%" }}>
              Forgot your password..?
            </Link>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2, width: "100%" }}
              onClick={handleSignIn}
            >
              Sign in
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignIn;
