import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [opacity, setOpacity] = useState(1);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [previousPath, setPreviousPath] = useState(location.pathname);

  useEffect(() => {
    // Skip transition on initial load
    if (isInitialLoad) {
      setIsInitialLoad(false);
      setDisplayChildren(children);
      setPreviousPath(location.pathname);
      return;
    }

    // Only transition if location actually changed
    if (location.pathname !== previousPath) {
      // Step 1: Fade out current page over 250ms
      setOpacity(0);
      
      // Step 2: After fade out completes, update content and fade in
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setPreviousPath(location.pathname);
        
        // Start fade in after content is updated
        setTimeout(() => {
          setOpacity(1);
        }, 10); // Very small delay to ensure content is rendered
      }, 250); // Wait 250ms for fade out to complete
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, children, isInitialLoad, previousPath]);

  const getAnimationStyles = () => {
    return {
      opacity,
      transition: isInitialLoad ? 'none' : `opacity ${opacity === 0 ? '250ms' : '750ms'} ease-in-out`,
      width: '100%',
      minHeight: 'calc(100vh - 64px)',
      padding: '20px',
      boxSizing: 'border-box' as const
    };
  };

  return (
    <Box sx={getAnimationStyles()}>
      {displayChildren}
    </Box>
  );
};

export default PageTransition;
