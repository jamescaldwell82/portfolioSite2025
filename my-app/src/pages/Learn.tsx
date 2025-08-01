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
      
      <Typography variant="body1" paragraph>
        Curate valuable resources for others in your field, share learning paths, 
        recommend books, courses, or tools. This positions you as someone who values 
        continuous learning and knowledge sharing.
      </Typography>
    </PageLayout>
  );
};

export default Learn;
