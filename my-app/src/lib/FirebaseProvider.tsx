import React, { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { app, analytics } from './firebase';
import { trackPageView } from './analytics';

interface FirebaseContextType {
  app: typeof app;
  analytics: typeof analytics;
  trackPageView: typeof trackPageView;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

interface FirebaseProviderProps {
  children: ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  useEffect(() => {
    // Initialize analytics on app load
    if (analytics) {
      trackPageView('Home');
    }
  }, []);

  const value = {
    app,
    analytics,
    trackPageView,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
