import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  autocompleteClasses,
  Container,
  Grid,
  CircularProgress,
} from "@mui/material";
import BeneficiariesHeader from "../../components/beneficiaries/BeneficiariesHeader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "../../axiosConfig";
import { useAuth } from "../../context/AuthContext";
import CustomAlert from "../../components/CustomAlert";

const Beneficiaries = () => {
  const navigate = useNavigate();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBeneficiaries = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/admin/allBeneficiaries`);
        // console.log("Fetched beneficiaries:", response.data);
        setBeneficiaries(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setErrorMessage("Error fetching beneficiaries. Please try again.");
        setAlertOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBeneficiaries();
  }, []);

  const handleNavigateTo = (path) => {
    navigate(path);
  };

  const filteredBeneficiaries = beneficiaries.filter((beneficiary) =>
    beneficiary.Username__c.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          maxWidth: "lg",
          margin: "0 auto",
        }}
      >
        <BeneficiariesHeader
          title="Beneficiaries"
          // onBack={() => window.history.back()}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "top",
              height: "100vh",
              paddingTop: 4
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {filteredBeneficiaries.length === 0 ? (
              <Typography
                variant="body1"
                sx={{ textAlign: "center", marginTop: 4 }}
              >
                No beneficiaries to display.
              </Typography>
            ) : (
              <Grid container spacing={1} sx={{ width: "100%", mt: 2 }}>
                {filteredBeneficiaries.map((user, index) => (
                  <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                    <Paper
                      sx={{
                        p: 1,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        height: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          flexGrow: 1,
                        }}
                      >
                        <Typography variant="body2">
                          {user.Username__c}
                        </Typography>
                      </Box>
                      <IconButton
                        aria-label="view reservation"
                        color="primary"
                        onClick={() => {
                          localStorage.setItem('shopifyId', user.Shopify_Id__c);
                          handleNavigateTo(`/reservationsAdmin/${user.Shopify_Id__c}`);
                        }}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>
      <CustomAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        severity="error"
        message={errorMessage}
      />
    </>
  );
};

export default Beneficiaries;
