import React, { useState,useEffect } from 'react';
import { Box, Typography, TextField, Avatar, Button,CircularProgress } from '@mui/material';
import ProfileHeader from '../components/profile/ProfileHeader'
import axios from "../axiosConfig";
import CustomAlert from '../components/CustomAlert';
import { useAuth } from '../context/AuthContext';


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
      <Avatar
        src="/src/assets/pp.png" 
        alt="Profile"
        sx={{ width: 100, height: 100, mt: 2, mb: 2, borderRadius: '50%' }}
      />
      <Typography variant="h6" gutterBottom>
        Username
      </Typography>
      <TextField
        name="username"
        value={profileData.username}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        disabled
      />
      <Typography variant="h6" gutterBottom>
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
      />
      <Typography variant="h6" gutterBottom>
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
      {isEditing && (
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={()=>{
          handleEditToggle();
          editBeneficiaryProfile(profileData);
          }}>
          Save
        </Button>
      )}
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      <CustomAlert
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        severity="error"
        message={errorMessage}
      />
    </Box>
  );
};

export default Profile;
