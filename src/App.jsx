import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#FE0207', 
    },
    secondary: {
      main: '#ff5722',
    },
    orange: {
      main: '#FF9800', 
    },
    yellow: {
      main: '#FFEB3B',
    },
    lightGreen: {
      main: '#80FE02',
    },
    green: {
      main: '#2BEE0A',
    },
    blue: {
      main: '#1663FF',
    },
    lightBlue: {
      main: '#4EDBFF',
    },
    purple: {
      main: '#7F01FB',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
      <Router>
      <Layout />
      </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
