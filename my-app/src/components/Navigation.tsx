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
            backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
            fontSize: { md: '0.875rem', lg: '1rem' },
            px: { md: 1, lg: 2 },
            py: 1,
            minWidth: 'auto',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
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
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
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
      </Menu>
    </>
  );

  return (
    <AppBar position="static" sx={{ width: '100%' }}>
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
            color: 'inherit',
            fontWeight: 'bold',
            fontSize: { xs: '1.1rem', md: '1.25rem' }
          }}
        >
          James Caldwell
        </Typography>

        {renderDesktopNav()}
        {renderMobileNav()}

        <Box sx={{ ml: { xs: 1, md: 2 } }}>
          {user ? (
            <UserProfile />
          ) : (
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={onAuthModalOpen}
              sx={{ 
                fontSize: { xs: '0.875rem', md: '1rem' },
                px: { xs: 1, md: 2 }
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                Sign In
              </Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                Login
              </Box>
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
