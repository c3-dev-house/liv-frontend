import React from 'react';
import { Box,Alert,AlertTitle } from '@mui/material';

const PendingApproval = ({name,surname}) => {
  return (
    <Alert severity="info">
      <AlertTitle>Registration Pending</AlertTitle>
      {`Dear ${name} ${surname}, thank you for your application. Your registration is pending. We will notify you via SMS once it has been reviewed and approved.`}
    </Alert>
    
  );
};

export default PendingApproval;
