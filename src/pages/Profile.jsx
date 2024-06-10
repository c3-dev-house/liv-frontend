import React, { useState } from 'react';
import { Box, Typography, TextField, Avatar, Button } from '@mui/material';
import ProfileHeader from '../components/profile/ProfileHeader'

const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: 'joycejoys',
    aboutMe: "I’m a 32 year old single mother of three, who would climb mountains for my children.",
    address: 'KwaZulu-Natal, Street 1',
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

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
        name="address"
        value={profileData.address}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        disabled={!isEditing}
      />
      {isEditing && (
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleEditToggle}>
          Save
        </Button>
      )}
    </Box>
  );
};

export default Profile;
