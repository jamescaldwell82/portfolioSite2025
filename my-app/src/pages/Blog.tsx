import React from 'react';
import { isFeatureEnabled } from '../lib/featureFlags';
import ComingSoon from '../components/ComingSoon';
import PageLayout from '../components/PageLayout';
import { Typography } from '@mui/material';

const Blog: React.FC = () => {
  // Check if blog feature is enabled
  if (!isFeatureEnabled('blogEnabled')) {
    return (
      <ComingSoon 
        featureName="Blog"
        description="I'm working on creating engaging blog content where I'll share insights about software development, technical training experiences, and career journey stories."
        estimatedCompletion="Coming Soon"
      />
    );
  }

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
