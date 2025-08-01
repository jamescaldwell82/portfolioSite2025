// Feature Flags Configuration
// This file controls which features are enabled/disabled in the application

export interface FeatureFlags {
  // Navigation features
  blogEnabled: boolean;
  learnEnabled: boolean;
  
  // Future feature flags can be added here
  // e.g., adminPanelEnabled: boolean;
  // e.g., analyticsEnabled: boolean;
}

// Feature flags configuration
// Set to false to hide features that are still in development
export const featureFlags: FeatureFlags = {
  // Blog section - set to false to hide until development is complete
  blogEnabled: false,
  
  // Learn section - set to false to hide until development is complete  
  learnEnabled: false,
};

// Helper function to check if a feature is enabled
export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean => {
  return featureFlags[feature];
};

// Development mode override - uncomment to enable all features in development
// if (process.env.NODE_ENV === 'development') {
//   featureFlags.blogEnabled = true;
//   featureFlags.learnEnabled = true;
// }
