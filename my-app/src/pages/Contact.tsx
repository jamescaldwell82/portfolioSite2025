import React from 'react';
import { Typography } from '@mui/material';
import PageLayout from '../components/PageLayout';

const Contact: React.FC = () => {
  return (
    <PageLayout title="Contact">
      <Typography variant="body1" paragraph>
        This is the Contact page. You can add your contact information and contact form here.
      </Typography>
      
      <Typography variant="body1" paragraph>
        Include multiple ways for people to reach you: email, social media links, 
        professional networks like LinkedIn, and consider adding a contact form for 
        easy communication.
      </Typography>
    </PageLayout>
  );
};

export default Contact;
