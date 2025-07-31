import React from 'react';
import { Typography } from '@mui/material';
import PageLayout from '../components/PageLayout';

const Learn: React.FC = () => {
  return (
    <PageLayout title="Learn">
      <Typography variant="body1" paragraph>
        This is the Learn page. You can share learning resources, tutorials, and 
        educational content here.
      </Typography>
      
      <Typography variant="body1" paragraph>
        Curate valuable resources for others in your field, share learning paths, 
        recommend books, courses, or tools. This positions you as someone who values 
        continuous learning and knowledge sharing.
      </Typography>
    </PageLayout>
  );
};

export default Learn;
