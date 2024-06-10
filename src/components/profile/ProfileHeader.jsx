import React from 'react';
import { Toolbar, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

const ProfileHeader = ({ title, onBack, onEdit, showEdit }) => {
  return (
    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <IconButton edge="start" color="inherit" aria-label="back" onClick={onBack}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6">{title}</Typography>
      {showEdit && (
        <IconButton edge="end" color="inherit" aria-label="edit" onClick={onEdit}>
          <EditIcon />
        </IconButton>
      )}
    </Toolbar>
  );
};

export default ProfileHeader;
