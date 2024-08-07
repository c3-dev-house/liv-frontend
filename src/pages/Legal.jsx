import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Legal = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
        <Typography variant="h4" gutterBottom>
          Legal Information
        </Typography>
        <Typography variant="h6" gutterBottom>
          POPI Act Disclaimer
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to Umthombo Marketplace.
        </Typography>
        <Typography variant="body1" gutterBottom>
          At Umthombo Marketplace, we are committed to protecting your personal information and ensuring that your privacy is respected. This disclaimer outlines how we handle your personal data in compliance with the Protection of Personal Information Act (POPIA) of South Africa.
        </Typography>
        <Typography variant="h6" gutterBottom>
          1. Collection of Personal Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          We collect and process personal information that you voluntarily provide to us when you use our app. This information may include, but is not limited to, your name, contact details, and any other information you choose to provide.
        </Typography>
        <Typography variant="h6" gutterBottom>
          2. Purpose of Collection
        </Typography>
        <Typography variant="body1" gutterBottom>
          The personal information collected is used for the following purposes:
        </Typography>
        <Typography variant="body1" gutterBottom>
          - To provide and improve our services.
        </Typography>
        <Typography variant="body1" gutterBottom>
          - To communicate with you regarding your use of the app.
        </Typography>
        <Typography variant="body1" gutterBottom>
          - To respond to your inquiries and requests.
        </Typography>
        <Typography variant="body1" gutterBottom>
          - To comply with legal obligations.
        </Typography>
        <Typography variant="h6" gutterBottom>
          3. Data Storage and Security
        </Typography>
        <Typography variant="body1" gutterBottom>
          All personal information is securely stored in Salesforce and Shopify. We do not use any other databases for storing your data. We have implemented appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </Typography>
        <Typography variant="body1" gutterBottom>
        Data is processed in the AWS cloud, specifically within the Paris region. User data is stored on Salesforce instances located in Europe.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Personal information can be stored up to five years after a user deregisters from the application.
        </Typography>
        <Typography variant="h6" gutterBottom>
          4. Sharing of Personal Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          We do not share your personal information with third parties except as necessary to provide our services or as required by law.
        </Typography>
        <Typography variant="h6" gutterBottom>
          5. Your Rights
        </Typography>
        <Typography variant="body1" gutterBottom>
          In accordance with POPIA, you have the right to:
        </Typography>
        <Typography variant="body1" gutterBottom>
          - Access your personal information.
        </Typography>
        <Typography variant="body1" gutterBottom>
          - Correct or update any personal information that is inaccurate.
        </Typography>
        <Typography variant="body1" gutterBottom>
          - Object to the processing of your personal information.
        </Typography>
        <Typography variant="body1" gutterBottom>
          - Request the deletion of your personal information.
        </Typography>
        <Typography variant="h6" gutterBottom>
          6. Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          If you have any questions or concerns about how we handle your personal information, please contact us via email addressed to nqobile@liv-village.com.
        </Typography>
        <Typography variant="body1" gutterBottom>
          By using our app, you acknowledge that you have read and understood this disclaimer and agree to the collection, use, and storage of your personal information as described.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thank you for trusting us with your personal information.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Umthombo Marketplace
        </Typography>
      </Box>
    </Container>
  );
};

export default Legal;
