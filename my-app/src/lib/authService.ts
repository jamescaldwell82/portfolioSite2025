import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  OAuthProvider,
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import type { User, UserCredential } from 'firebase/auth';
import { auth } from './firebase';

// Microsoft Auth Provider
const microsoftProvider = new OAuthProvider('microsoft.com');

// Configure Microsoft provider with additional scopes
microsoftProvider.addScope('https://graph.microsoft.com/User.Read');
microsoftProvider.addScope('email');
microsoftProvider.addScope('profile');

// Set custom parameters for Microsoft
microsoftProvider.setCustomParameters({
  // Optional: force account selection
  prompt: 'select_account',
});

// Auth service functions
export const authService = {
  // Email/Password Sign In
  signInWithEmail: async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password);
  },

  // Email/Password Sign Up
  signUpWithEmail: async (email: string, password: string): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password);
  },

  // Microsoft Sign In
  signInWithMicrosoft: async (): Promise<UserCredential> => {
    try {
      const result = await signInWithPopup(auth, microsoftProvider);
      return result;
    } catch (error: any) {
      // Enhanced error handling for Microsoft auth
      console.error('Microsoft Sign-In Error:', error);
      
      if (error.code === 'auth/invalid-credential') {
        throw new Error('Microsoft authentication configuration error. Please check your Azure AD app registration and Firebase settings.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        throw new Error('Pop-up was blocked by your browser. Please allow pop-ups and try again.');
      }
      
      throw error;
    }
  },

  // Sign Out
  signOut: async (): Promise<void> => {
    return await signOut(auth);
  },

  // Password Reset
  resetPassword: async (email: string): Promise<void> => {
    return await sendPasswordResetEmail(auth, email);
  },

  // Get current user
  getCurrentUser: (): User | null => {
    return auth.currentUser;
  }
};

export default authService;
