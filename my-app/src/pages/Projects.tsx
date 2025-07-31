import React from 'react';
import { Typography } from '@mui/material';
import PageLayout from '../components/PageLayout';

const Projects: React.FC = () => {
  return (
    <PageLayout title="Projects">
      <Typography variant="body1" paragraph>
        This is the Projects page. You can showcase your work and portfolio projects here.
      </Typography>
      
      <Typography variant="body1" paragraph>
        Display your best work with project descriptions, technologies used, links to 
        live demos, and source code repositories. Include screenshots or videos to 
        make your projects more engaging.
      </Typography>
    </PageLayout>
  );
};

export default Projects;
