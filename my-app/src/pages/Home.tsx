import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import { useAuth } from '../lib/AuthProvider';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';

const Home: React.FC = () => {
  const [count, setCount] = useState(0);
  const { user } = useAuth();

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Container 
        maxWidth={false} 
        sx={{ 
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          py: { xs: 3, md: 6 }
        }}
      >
        <Paper 
          elevation={0} 
          sx={{ 
            p: { xs: 3, sm: 4, md: 6 }, 
            textAlign: 'center',
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Box sx={{ 
            mb: { xs: 2, md: 4 },
            '& .logo': {
              height: { xs: '4rem', sm: '5rem', md: '6rem' },
              padding: '1rem',
              willChange: 'filter',
              transition: 'filter 300ms',
              '&:hover': {
                filter: 'drop-shadow(0 0 2em #646cffaa)',
              },
              '&.react:hover': {
                filter: 'drop-shadow(0 0 2em #61dafbaa)',
              }
            }
          }}>
            <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </Box>
          
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom
            sx={{ 
              mb: { xs: 2, md: 3 },
              background: 'linear-gradient(45deg, #fff 30%, #ccc 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Vite + React
          </Typography>
          
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom 
            sx={{ 
              mb: { xs: 2, md: 4 },
              color: 'primary.main'
            }}
          >
            James Caldwell Portfolio
          </Typography>

          {user && (
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
                mb: { xs: 2, md: 3 },
                color: 'success.main'
              }}
            >
              Welcome, {user.displayName || user.email}!
            </Typography>
          )}

          <Box sx={{ 
            my: { xs: 3, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setCount((count) => count + 1)}
              sx={{
                px: { xs: 3, md: 4 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.125rem' },
                fontWeight: 600
              }}
            >
              Count is {count}
            </Button>
            <Typography 
              variant="body1" 
              sx={{ 
                maxWidth: { xs: '100%', md: '600px' },
                color: 'text.secondary'
              }}
            >
              Edit <code style={{ 
                backgroundColor: '#333', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px',
                fontSize: '0.875em'
              }}>src/App.tsx</code> and save to test HMR
            </Typography>
          </Box>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', md: '1rem' }
            }}
          >
            Click on the Vite and React logos to learn more
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
