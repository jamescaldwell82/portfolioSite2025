import React from 'react';
import { Typography } from '@mui/material';
import PageLayout from '../components/PageLayout';

const Bio: React.FC = () => {
  return (
    <PageLayout title="Bio">
      <Typography variant="body1" paragraph>
        Welcome to my biography page. This is where you can share your personal story, 
        background, and what makes you unique as a professional.
      </Typography>
      
      <Typography variant="body1" paragraph>
        You can add information about your journey, interests, values, and what drives 
        your passion for your work. This section helps visitors connect with you on a 
        personal level.
      </Typography>
    </PageLayout>
  );
};

export default Bio;
