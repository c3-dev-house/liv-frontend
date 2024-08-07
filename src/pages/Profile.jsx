import React, { useState,useEffect } from 'react';
import { Box, Typography, TextField, Avatar, Button,CircularProgress, Container, Link} from '@mui/material';
import ProfileHeader from '../components/profile/ProfileHeader'
import axios from "../axiosConfig";
import CustomAlert from '../components/CustomAlert';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';


const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);
  const { profileData, fetchBeneficiaryProfile,setProfileData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const {fetchBeneficiaryProfile} = useAuth();


  const editBeneficiaryProfile = async (updatedUser) => {
    
    setLoading(true);
    try {
      const salesforceId = JSON.parse(localStorage.getItem('user')).Id;
      if (salesforceId) {
        await axios.patch(`api/profile/updateBeneficiary/${salesforceId}`, updatedUser);
        // console.log("Profile Called")
      } else {
        setErrorMessage('Error'); 
        setAlertOpen(true); 
      }
    } catch (error) {
      console.error('Error editing profile:', error);
      setErrorMessage('Failed to update profile. Please try again.');
      setAlertOpen(true); 
    } finally {
      setLoading(false);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  useEffect(() => {
    fetchBeneficiaryProfile();
    // console.log(profileData);
  }, []);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0, width: '100%', maxWidth: '1200px',minWidth: '320px' }}>
      <ProfileHeader
        title="Profile"
        onBack={() => window.history.back()}
        onEdit={handleEditToggle}
        showEdit={true}
        
      />
      {/*
      <Avatar
        src="/src/assets/pp.png" 
        alt="Profile"
        sx={{ width: 100, height: 100, mt: 2, mb: 2, borderRadius: '50%' }}
      />
      */}
      <Container  sx={{py:2, justifyContent: 'center', alignItems:'center'}}>
      <Typography variant="h6" gutterBottom sx={{py:1}}>
        Username
      </Typography>
      <TextField
        name="username"
        value={profileData.username}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        disabled
        sx={{py:1}}
      />
      <Typography variant="h6" gutterBottom sx={{py:1}}>
        About me
      </Typography>
      <TextField
        name="aboutMe"
        value={profileData.aboutMe}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        multiline
        disabled={!isEditing}
        sx={{py:1}}
      />
      <Typography variant="h6" gutterBottom sx={{py:1}}>
        Street address
      </Typography>
      <TextField
        name="streetAddress"
        value={profileData.streetAddress}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        disabled={!isEditing}
      />
      </Container>
      {isEditing && (
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={()=>{
          handleEditToggle();
          editBeneficiaryProfile(profileData);
          }}>
          Save
        </Button>
      )}
      {loading && 
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            mt: 4,
            ml: '75px'
          }}
        >
          <Spinner />
        </Box>}
      <CustomAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        severity="error"
        message={errorMessage}
      />
      <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
        At Umthombo Marketplace, we value your privacy and are committed to protecting your personal information in compliance with the Protection of Personal Information Act (POPIA). Click for more details. <Link href="/legal" underline="always">Legal page</Link>.
      </Typography>
    </Box>
  );
};

export default Profile;
