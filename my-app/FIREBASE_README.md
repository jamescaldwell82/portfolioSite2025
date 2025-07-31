# Firebase Configuration

This project is configured to use Firebase for hosting and analytics. Here's how to get started:

## Environment Setup

1. Copy the `.env` file and update it with your Firebase configuration if needed
2. The environment variables are already set up for your project

## Available Firebase Services

### Firebase Analytics
- Configured in `src/lib/firebase.ts`
- Analytics utilities available in `src/lib/analytics.ts`
- React context provider in `src/lib/FirebaseProvider.tsx`

### Firebase Hosting
- Configured in `firebase.json`
- Set to deploy the `dist` folder (Vite build output)
- SPA routing configured with rewrites

## Usage in React Components

```tsx
import { useFirebase } from './lib/FirebaseProvider';
import { trackProjectView, trackContactFormSubmission } from './lib/analytics';

function MyComponent() {
  const { trackPageView } = useFirebase();
  
  useEffect(() => {
    trackPageView('About');
  }, []);

  const handleContactSubmit = () => {
    // Handle form submission
    trackContactFormSubmission();
  };

  return (
    // Your component JSX
  );
}
```

## Deployment

### Build and Deploy
```bash
npm run deploy
```

### Just Build
```bash
npm run build
```

### Local Development with Firebase Emulators
```bash
npm run firebase:emulators
```

## Firebase CLI Setup

If you haven't already, login to Firebase CLI:
```bash
npx firebase login
```

## File Structure

```
src/
  lib/
    firebase.ts          # Main Firebase configuration
    analytics.js         # Analytics utility functions
    FirebaseProvider.tsx # React context provider
.env                     # Environment variables (not in git)
.firebaserc             # Firebase project configuration
firebase.json           # Firebase hosting configuration
```

## Security Notes

- The `.env` file is excluded from git to keep your Firebase config secure
- All Firebase config is loaded from environment variables
- Make sure to add your production environment variables to your hosting platform

## Analytics Events

The following custom events are tracked:
- `page_view` - When users navigate to different pages
- `project_view` - When users view project details
- `contact_form_submit` - When users submit the contact form
- `file_download` - When users download files (resume, etc.)
