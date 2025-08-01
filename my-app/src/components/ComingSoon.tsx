import React from 'react';
import { 
  Typography, 
  Box, 
  Container, 
  Card, 
  CardContent,
  Button,
  Stack
} from '@mui/material';
import { 
  Construction as ConstructionIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PageLayout from './PageLayout';

interface ComingSoonProps {
  featureName: string;
  description?: string;
  estimatedCompletion?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ 
  featureName, 
  description,
  estimatedCompletion 
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <PageLayout title={`${featureName} - Coming Soon`}>
      <Container maxWidth="md">
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center'
          }}
        >
          <Card 
            sx={{ 
              p: 4, 
              maxWidth: 600,
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              border: '1px solid rgba(100, 255, 218, 0.3)'
            }}
          >
            <CardContent>
              <Box sx={{ mb: 3 }}>
                <ConstructionIcon 
                  sx={{ 
                    fontSize: 80, 
                    color: '#64ffda',
                    mb: 2 
                  }} 
                />
              </Box>
              
              <Typography 
                variant="h3" 
                sx={{ 
                  color: '#64ffda', 
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                {featureName} Coming Soon!
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'text.secondary', 
                  mb: 3,
                  lineHeight: 1.6
                }}
              >
                {description || `The ${featureName} section is currently under development. I'm working hard to bring you amazing content and features.`}
              </Typography>

              {estimatedCompletion && (
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#64ffda', 
                    mb: 3,
                    fontStyle: 'italic'
                  }}
                >
                  Estimated completion: {estimatedCompletion}
                </Typography>
              )}

              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'text.secondary', 
                  mb: 4 
                }}
              >
                In the meantime, feel free to explore other sections of my portfolio. 
                You can check out my projects, read my bio, or get in touch!
              </Typography>

              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={2} 
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  startIcon={<ArrowBackIcon />}
                  onClick={handleGoBack}
                  sx={{
                    bgcolor: '#64ffda',
                    color: '#000',
                    '&:hover': { bgcolor: '#4ecdc4' }
                  }}
                >
                  Go Back
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleGoHome}
                  sx={{
                    borderColor: '#64ffda',
                    color: '#64ffda',
                    '&:hover': { 
                      borderColor: '#4ecdc4',
                      color: '#4ecdc4',
                      backgroundColor: 'rgba(100, 255, 218, 0.1)'
                    }
                  }}
                >
                  Go to Home
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default ComingSoon;
