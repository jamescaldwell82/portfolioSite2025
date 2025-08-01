import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import type { ReactNode } from 'react';

interface PageLayoutProps {
  title?: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  title, 
  children, 
  maxWidth = false 
}) => {
  return (
    <Box sx={{ 
      width: '100%', 
      minHeight: 'calc(100vh - 72px)', 
      bgcolor: 'background.default',
      pt: { xs: 3, md: 6 },
      pb: { xs: 4, md: 8 }
    }}>
      <Container 
        maxWidth={maxWidth} 
        sx={{ 
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
        }}
      >
        {title && (
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom
          sx={{ 
            mb: { xs: 3, md: 6 },
            textAlign: { xs: 'center', md: 'center' },
            background: 'linear-gradient(45deg, #fff 30%, #ccc 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          {title}
        </Typography>
        )}
        <Box sx={{ 
          color: 'text.primary',
          '& p': {
            fontSize: { xs: '1rem', md: '1.125rem' },
            lineHeight: 1.7,
            mb: 2
          },
          '& h2': {
            fontSize: { xs: '1.5rem', md: '2rem' },
            mb: 3,
            mt: 4
          },
          '& h3': {
            fontSize: { xs: '1.25rem', md: '1.5rem' },
            mb: 2,
            mt: 3
          }
        }}>
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default PageLayout;
