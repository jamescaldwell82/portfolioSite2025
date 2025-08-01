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
      {/* Animated Roadmap Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          zIndex: 0,
          opacity: { xs: 0.35, md: 0.15 }, // Much brighter on mobile
          pointerEvents: 'none'
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 1200"
          preserveAspectRatio="none"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Main road path */}
          <path
            id="roadPath"
            d="M 100 50 Q 300 150 500 250 Q 700 350 600 500 Q 500 650 200 750 Q 100 850 400 950 Q 700 1050 500 1150"
            stroke="rgba(100, 255, 218, 0.6)"
            strokeWidth="12"
            fill="none"
            strokeDasharray="20,10"
          />
          
          {/* Static milestone markers - bigger and brighter */}
          <circle cx="150" cy="80" r="12" fill="rgba(100, 255, 218, 0.7)" />
          <circle cx="480" cy="280" r="12" fill="rgba(255, 107, 107, 0.7)" />
          <circle cx="580" cy="480" r="12" fill="rgba(78, 205, 196, 0.7)" />
          <circle cx="220" cy="720" r="12" fill="rgba(69, 183, 209, 0.7)" />
          <circle cx="420" cy="920" r="12" fill="rgba(150, 206, 180, 0.7)" />
          <circle cx="480" cy="1120" r="12" fill="rgba(254, 202, 87, 0.7)" />
          
          {/* Animated traveling node - bigger and brighter */}
          <circle r="8" fill="#64ffda" opacity="1">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#roadPath" />
            </animateMotion>
            {/* Pulsing effect */}
            <animate
              attributeName="r"
              values="8;14;8"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.8;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* Trailing glow effect - larger */}
          <circle r="18" fill="#64ffda" opacity="0.3">
            <animateMotion
              dur="15s"
              repeatCount="indefinite"
              rotate="auto"
            >
              <mpath href="#roadPath" />
            </animateMotion>
          </circle>
          
          {/* Decorative elements - bigger and brighter */}
          <rect x="50" y="30" width="25" height="20" fill="rgba(255, 255, 255, 0.2)" rx="3" />
          <rect x="750" y="200" width="20" height="25" fill="rgba(255, 255, 255, 0.2)" rx="3" />
          <rect x="30" y="500" width="30" height="18" fill="rgba(255, 255, 255, 0.2)" rx="3" />
          <rect x="700" y="700" width="25" height="25" fill="rgba(255, 255, 255, 0.2)" rx="3" />
          <rect x="200" y="950" width="28" height="20" fill="rgba(255, 255, 255, 0.2)" rx="3" />
        </svg>
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
