import React from 'react';
import { Typography } from '@mui/material';
import PageLayout from '../components/PageLayout';

const Blog: React.FC = () => {
  return (
    <PageLayout title="Blog">
      <Typography variant="body1" paragraph>
        This is the Blog page. You can share your thoughts, articles, and insights here.
      </Typography>
      
      <Typography variant="body1" paragraph>
        Use this space to write about your experiences, share tutorials, discuss 
        industry trends, or provide insights into your field of expertise. Regular 
        blog posts can help establish you as a thought leader.
      </Typography>
    </PageLayout>
  );
};

export default Blog;
