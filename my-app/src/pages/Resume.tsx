import React from 'react';
import { Typography } from '@mui/material';
import PageLayout from '../components/PageLayout';

const Resume: React.FC = () => {
  return (
    <PageLayout title="Resume">
      <Typography variant="body1" paragraph>
        This is the Resume page. You can add your professional experience, education, 
        and skills here.
      </Typography>
      
      <Typography variant="body1" paragraph>
        Consider organizing this section with your work history, educational background, 
        technical skills, certifications, and any other relevant professional information.
      </Typography>
    </PageLayout>
  );
};

export default Resume;
