import React from 'react';
import { Box } from '@mui/material';

interface AnimatedRoadmapBackgroundProps {
  intensity?: 'subtle' | 'normal' | 'prominent';
}

const AnimatedRoadmapBackground: React.FC<AnimatedRoadmapBackgroundProps> = ({ 
  intensity = 'normal' 
}) => {
  // Adjust opacity based on intensity level
  const getOpacity = () => {
    switch (intensity) {
      case 'subtle':
        return { xs: 0.3, md: 0.2 };
      case 'prominent':
        return { xs: 0.7, md: 0.4 };
      default: // normal
        return { xs: 0.5, md: 0.3 }; // Increased for better visibility
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        zIndex: 0, // Changed from -1 to 0 to ensure visibility
        opacity: getOpacity(),
        pointerEvents: 'none'
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 2000"
        preserveAspectRatio="none"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Main winding road path */}
        <path
          id="siteRoadPath"
          d="M 100 50 Q 300 150 500 250 Q 700 350 600 500 Q 500 650 200 750 Q 100 850 400 950 Q 700 1050 500 1200 Q 300 1350 450 1500 Q 600 1650 350 1800 Q 200 1900 400 1950"
          stroke="rgba(100, 255, 218, 0.6)"
          strokeWidth="14"
          fill="none"
          strokeDasharray="30,15"
        />
        
        {/* Animated traveling node */}
        <circle r="10" fill="#64ffda" opacity="1">
          <animateMotion
            dur="30s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#siteRoadPath" />
          </animateMotion>
          {/* Pulsing effect */}
          <animate
            attributeName="r"
            values="10;16;10"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="1;0.7;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
        
        {/* Primary trailing glow */}
        <circle r="20" fill="#64ffda" opacity="0.25">
          <animateMotion
            dur="30s"
            repeatCount="indefinite"
            rotate="auto"
          >
            <mpath href="#siteRoadPath" />
          </animateMotion>
        </circle>
        
        {/* Secondary trailing glow */}
        <circle r="30" fill="#64ffda" opacity="0.12">
          <animateMotion
            dur="30s"
            repeatCount="indefinite"
            rotate="auto"
            begin="1s"
          >
            <mpath href="#siteRoadPath" />
          </animateMotion>
        </circle>
        
        {/* Static milestone markers */}
        <circle cx="150" cy="80" r="12" fill="rgba(100, 255, 218, 0.7)" />
        <circle cx="480" cy="280" r="12" fill="rgba(255, 107, 107, 0.7)" />
        <circle cx="580" cy="480" r="12" fill="rgba(78, 205, 196, 0.7)" />
        <circle cx="220" cy="720" r="12" fill="rgba(69, 183, 209, 0.7)" />
        <circle cx="420" cy="920" r="12" fill="rgba(150, 206, 180, 0.7)" />
        <circle cx="480" cy="1180" r="12" fill="rgba(254, 202, 87, 0.7)" />
        <circle cx="430" cy="1480" r="12" fill="rgba(100, 255, 218, 0.7)" />
        
        {/* Additional milestone markers */}
        <circle cx="320" cy="600" r="8" fill="rgba(255, 255, 255, 0.5)" />
        <circle cx="550" cy="800" r="8" fill="rgba(255, 255, 255, 0.5)" />
        <circle cx="300" cy="1000" r="8" fill="rgba(255, 255, 255, 0.5)" />
        <circle cx="520" cy="1320" r="8" fill="rgba(255, 255, 255, 0.5)" />
        <circle cx="380" cy="1620" r="8" fill="rgba(255, 255, 255, 0.5)" />
        
        {/* Decorative elements scattered throughout */}
        <rect x="50" y="30" width="25" height="20" fill="rgba(255, 255, 255, 0.2)" rx="3" />
        <rect x="750" y="200" width="20" height="25" fill="rgba(255, 255, 255, 0.2)" rx="3" />
        <rect x="30" y="500" width="30" height="18" fill="rgba(255, 255, 255, 0.2)" rx="3" />
        <rect x="700" y="700" width="22" height="22" fill="rgba(255, 255, 255, 0.2)" rx="3" />
        <rect x="200" y="950" width="28" height="20" fill="rgba(255, 255, 255, 0.2)" rx="3" />
        <rect x="600" y="1200" width="24" height="18" fill="rgba(255, 255, 255, 0.2)" rx="3" />
        <rect x="100" y="1400" width="26" height="22" fill="rgba(255, 255, 255, 0.2)" rx="3" />
        <rect x="650" y="1600" width="20" height="24" fill="rgba(255, 255, 255, 0.2)" rx="3" />
        <rect x="250" y="1800" width="32" height="16" fill="rgba(255, 255, 255, 0.2)" rx="3" />
        
        {/* Additional path decorations */}
        <path
          d="M 50 100 Q 150 120 250 140"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M 600 300 Q 700 320 750 350"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M 100 800 Q 200 820 300 840"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M 500 1100 Q 600 1120 700 1150"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M 150 1300 Q 250 1320 350 1340"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M 450 1550 Q 550 1570 650 1590"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="3"
          fill="none"
        />
      </svg>
    </Box>
  );
};

export default AnimatedRoadmapBackground;
