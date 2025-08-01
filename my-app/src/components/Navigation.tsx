import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Login as LoginIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/AuthProvider';
import UserProfile from './UserProfile';

// Keyframes for moving gradient animation
const movingGradient = `
  @keyframes moveGradient {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }
`;

interface NavigationProps {
  onAuthModalOpen: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onAuthModalOpen }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null);

  const navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Bio', path: '/bio' },
    { label: 'Resume', path: '/resume' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
    { label: 'Learn', path: '/learn' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const renderDesktopNav = () => (
    <Box sx={{ 
      display: { xs: 'none', md: 'flex' }, 
      alignItems: 'center', 
      gap: { md: 0.5, lg: 1 } 
    }}>
      {navigationItems.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          color="inherit"
          sx={{
            backgroundColor: location.pathname === item.path 
              ? 'rgba(100, 255, 218, 0.2)' 
              : 'transparent',
            color: location.pathname === item.path 
              ? '#000' 
              : '#fff',
            fontSize: { md: '0.875rem', lg: '1rem' },
            px: { md: 1, lg: 2 },
            py: 1,
            minWidth: 'auto',
            borderRadius: '8px',
            fontWeight: location.pathname === item.path ? 'bold' : 'normal',
            border: location.pathname === item.path 
              ? '2px solid #000' 
              : '2px solid transparent',
            textShadow: location.pathname === item.path 
              ? 'none' 
              : '1px 1px 2px rgba(0, 0, 0, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(100, 255, 218, 0.3)',
              color: '#000',
              border: '2px solid #000',
              textShadow: 'none',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.3s ease'
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );

  const renderMobileNav = () => (
    <>
      <IconButton
        color="inherit"
        onClick={handleMobileMenuOpen}
        sx={{ 
          display: { xs: 'block', md: 'none' },
          color: '#fff',
          filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8))',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
            color: '#64ffda',
            filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8))'
          },
          '&:focus': {
            backgroundColor: 'transparent',
            outline: 'none'
          },
          transition: 'all 0.3s ease'
        }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 250,
            maxHeight: '100vh',
            backgroundColor: '#2d2d2d',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            '& .MuiMenuItem-root': {
              color: 'white',
              py: 1.5,
              px: 2,
              borderRadius: '8px',
              margin: '4px 8px',
              '&:hover': {
                backgroundColor: 'rgba(100, 255, 218, 0.15)',
                color: '#64ffda'
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(100, 255, 218, 0.2)',
                color: '#64ffda',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: 'rgba(100, 255, 218, 0.25)',
                }
              }
            }
          },
        }}
      >
        {navigationItems.map((item) => (
          <MenuItem
            key={item.path}
            component={Link}
            to={item.path}
            onClick={handleMobileMenuClose}
            selected={location.pathname === item.path}
          >
            {item.label}
          </MenuItem>
        ))}
        
        {/* Add login/user profile to mobile menu */}
        {user ? (
          <MenuItem 
            onClick={() => {
              // Don't close menu immediately for user profile interactions
            }}
          >
            <UserProfile />
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              // Open auth modal first, then close menu
              onAuthModalOpen();
              // Delay closing the menu to allow modal to open
              setTimeout(() => {
                handleMobileMenuClose();
              }, 100);
            }}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(100, 255, 218, 0.15)',
                color: '#64ffda'
              }
            }}
          >
            <LoginIcon sx={{ mr: 1 }} />
            Sign In
          </MenuItem>
        )}
      </Menu>
    </>
  );

  return (
    <>
      <style>
        {movingGradient}
      </style>
      <AppBar 
        position="static" 
        sx={{ 
          width: '100%',
          background: 'linear-gradient(-45deg, #1a1a1a, #2d2d2d, #1a1a1a, #64ffda)',
          backgroundSize: '400% 400%',
          animation: 'moveGradient 15s ease infinite',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(-45deg, #1a1a1a, #2d2d2d, #1a1a1a, rgba(100, 255, 218, 0.1))',
            backgroundSize: '400% 400%',
            animation: 'moveGradient 15s ease infinite',
            zIndex: -1
          }
        }}
      >
      <Toolbar sx={{ 
        px: { xs: 2, sm: 3, md: 4, lg: 6 },
        minHeight: { xs: 64, md: 72 }
      }}>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/"
          sx={{ 
            flexGrow: 1, 
            textDecoration: 'none', 
            color: '#fff',
            fontWeight: 'bold',
            fontSize: { xs: '1.1rem', md: '1.25rem' },
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
            '&:hover': {
              color: '#64ffda',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              transition: 'color 0.3s ease'
            }
          }}
        >
          James Caldwell
        </Typography>

        {renderDesktopNav()}
        {renderMobileNav()}

        {/* Show UserProfile only on desktop when logged in */}
        {user && (
          <Box sx={{ ml: { xs: 1, md: 2 }, display: { xs: 'none', md: 'block' } }}>
            <UserProfile />
          </Box>
        )}
      </Toolbar>
    </AppBar>
    </>
  );
};

export default Navigation;
