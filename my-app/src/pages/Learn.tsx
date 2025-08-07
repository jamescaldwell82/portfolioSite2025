import React from 'react';
import { isFeatureEnabled } from '../lib/featureFlags';
import ComingSoon from '../components/ComingSoon';
import PageLayout from '../components/PageLayout';
import { Typography } from '@mui/material';

const Learn: React.FC = () => {
  // Check if learn feature is enabled
  if (!isFeatureEnabled('learnEnabled')) {
    return (
      <ComingSoon 
        featureName="Learn"
        description="I'm developing a comprehensive learning resources section featuring tutorials, recommended courses, and educational content for aspiring developers and those looking to advance their technical skills."
        estimatedCompletion="Coming Soon"
      />
    );
  }

  return (
    <PageLayout title="Learn">
      <Typography variant="body1" paragraph>
        This is the Learn page. You can share learning resources, tutorials, and 
        educational content here.
      </Typography>
      
      <Typography variant="h5" sx={{ mt: 3, mb: 2, color: '#2563eb', fontWeight: 600 }}>
        How do I learn to code?
      </Typography>
      <Typography variant="body1" paragraph>
        Learning to code is a journey that requires consistency, practice, and the right resources. 
        Start with understanding the fundamentals of programming logic and syntax through interactive 
        platforms like freeCodeCamp or Codecademy. Complement your learning with video tutorials 
        from YouTube channels like Traversy Media, The Net Ninja, or freeCodeCamp's channel, which 
        offer visual explanations and real-world projects. Build projects regularly to apply what 
        you've learned, join coding communities for support, and don't be afraid to make mistakes 
        - they're an essential part of the learning process.
      </Typography>
    </PageLayout>
  );
};

export default Learn;
