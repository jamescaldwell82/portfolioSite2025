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
  ArrowBack as ArrowBackIcon,
  Build as BuildIcon,
  Engineering as EngineeringIcon,
  Handyman as HandymanIcon
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
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
            textAlign: 'center',
            position: 'relative'
          }}
        >
          {/* Construction Site Decorations */}
          {/* Top construction elements */}
          <Box
            sx={{
              position: 'absolute',
              top: { xs: 10, md: 20 },
              left: { xs: 10, md: 50 },
              color: '#ff6b6b',
              opacity: 0.7,
              animation: 'float 3s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-10px)' }
              }
            }}
          >
            <BuildIcon sx={{ fontSize: { xs: 24, md: 32 } }} />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              top: { xs: 30, md: 60 },
              right: { xs: 20, md: 80 },
              color: '#4ecdc4',
              opacity: 0.6,
              animation: 'bounce 2s ease-in-out infinite',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0px)' },
                '50%': { transform: 'translateY(-15px)' }
              }
            }}
          >
            <EngineeringIcon sx={{ fontSize: { xs: 20, md: 28 } }} />
          </Box>

          {/* Side construction elements */}
          <Box
            sx={{
              position: 'absolute',
              left: { xs: 5, md: 20 },
              top: '50%',
              color: '#96ceb4',
              opacity: 0.5,
              animation: 'wiggle 4s ease-in-out infinite',
              '@keyframes wiggle': {
                '0%, 100%': { transform: 'rotate(0deg)' },
                '25%': { transform: 'rotate(5deg)' },
                '75%': { transform: 'rotate(-5deg)' }
              }
            }}
          >
            <HandymanIcon sx={{ fontSize: { xs: 18, md: 24 } }} />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              right: { xs: 5, md: 20 },
              top: '60%',
              color: '#feca57',
              opacity: 0.6,
              animation: 'pulse 2.5s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' }
              }
            }}
          >
            <BuildIcon sx={{ fontSize: { xs: 16, md: 22 } }} />
          </Box>

          {/* Bottom construction elements */}
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: 20, md: 40 },
              left: { xs: 30, md: 100 },
              color: '#45b7d1',
              opacity: 0.4,
              animation: 'float 3.5s ease-in-out infinite'
            }}
          >
            <EngineeringIcon sx={{ fontSize: { xs: 22, md: 30 } }} />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: 10, md: 20 },
              right: { xs: 15, md: 60 },
              color: '#ff6b6b',
              opacity: 0.5,
              animation: 'bounce 3s ease-in-out infinite'
            }}
          >
            <HandymanIcon sx={{ fontSize: { xs: 20, md: 26 } }} />
          </Box>

          {/* Construction barrier stripes effect around the card */}
          <Box
            sx={{
              position: 'absolute',
              top: -10,
              left: -10,
              right: -10,
              bottom: -10,
              background: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255, 107, 107, 0.1) 10px,
                rgba(255, 107, 107, 0.1) 20px
              )`,
              borderRadius: '20px',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          <Card 
            sx={{ 
              p: 4, 
              maxWidth: 600,
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              border: '3px solid #feca57',
              borderRadius: '16px',
              position: 'relative',
              zIndex: 1,
              boxShadow: '0 8px 32px rgba(254, 202, 87, 0.2)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                background: 'linear-gradient(45deg, #feca57, #ff6b6b, #4ecdc4, #96ceb4)',
                borderRadius: '18px',
                zIndex: -1,
                opacity: 0.3
              }
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
                <Button
                  component={Link}
                  to="/oops"
                  variant="text"
                  sx={{
                    color: '#64ffda',
                    '&:hover': { color: '#4ecdc4' }
                  }}>Or you can play a game! 🎮</Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </PageLayout>
  );
};

export default ComingSoon;
