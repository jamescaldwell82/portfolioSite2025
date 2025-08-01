import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Container,
  Stack
} from '@mui/material';
import { Download, Email } from '@mui/icons-material';

const Home: React.FC = () => {
  // Rotating subtitle titles
  const titles = [
    'Software Engineer',
    'Coach',
    'Full Stack Developer',
    'Husband',
    'Technical Trainer',
    'Father'
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        setIsVisible(true);
      }, 300); // Half second fade out
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)', // Subtract navigation height (64px on mobile, 72px on desktop)
        '@media (min-width: 900px)': {
          height: 'calc(100vh - 72px)', // Desktop navigation height
        },
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        width: '100%',
        margin: 0,
        padding: 0,
      }}
    >
      {/* Background Image Placeholders */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: { xs: '120px', sm: '200px', md: '300px' },
          height: { xs: '120px', sm: '200px', md: '300px' },
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          border: '2px dashed rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0
        }}
      >
        <Typography
          variant="body2"
          sx={{
            m: 0,
            color: 'rgba(255, 255, 255, 0.3)',
            textAlign: 'center',
            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' }
          }}
        >
          Image Placeholder
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: '12%',
          left: '5%',
          width: { xs: '100px', sm: '150px', md: '250px' },
          height: { xs: '100px', sm: '150px', md: '250px' },
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          border: '2px dashed rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0
        }}
      >
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: 'rgba(255, 255, 255, 0.3)',
            textAlign: 'center',
            fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' }
          }}
        >
          Image Placeholder
        </Typography>
      </Box>

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          px: { xs: 2, sm: 3, md: 4 }
        }}
      >
        <Stack spacing={{ xs: 3, sm: 4, md: 4 }} alignItems="center">
          {/* Main Heading */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { 
                xs: '2.5rem', 
                sm: '3.5rem', 
                md: '4.5rem', 
                lg: '5.5rem' 
              },
              fontWeight: 'bold',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              lineHeight: .25,
              mb: 0
            }}
          >
            James Caldwell
          </Typography>

          {/* Rotating Subtitle */}
          <Box
            sx={{
              height: { xs: '60px', sm: '80px', md: '80px' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { 
                  xs: '1.5rem', 
                  sm: '2rem', 
                  md: '2.5rem', 
                  lg: '3rem' 
                },
                fontWeight: 300,
                color: '#64ffda',
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                textAlign: 'center'
              }}
            >
              {titles[currentTitleIndex]}
            </Typography>
          </Box>

          {/* Call to Action Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, sm: 3 }}
            sx={{ mt: { xs: 4, sm: 6 } }}
          >
            <Button
              component={Link}
              to="/resume"
              variant="contained"
              size="large"
              startIcon={<Download />}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1rem', sm: '1.1rem' },
                backgroundColor: '#64ffda',
                color: '#000',
                fontWeight: 'bold',
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: '#4fd3a6',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(100, 255, 218, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              View Resume
            </Button>

            <Button
              component={Link}
              to="/contact"
              variant="outlined"
              size="large"
              startIcon={<Email />}
              sx={{
                px: { xs: 3, sm: 4 },
                py: { xs: 1.5, sm: 2 },
                fontSize: { xs: '1rem', sm: '1.1rem' },
                borderColor: '#64ffda',
                color: '#64ffda',
                fontWeight: 'bold',
                borderRadius: '8px',
                borderWidth: '2px',
                '&:hover': {
                  backgroundColor: 'rgba(100, 255, 218, 0.1)',
                  borderColor: '#4fd3a6',
                  color: '#4fd3a6',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(100, 255, 218, 0.2)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get In Touch
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Home;
