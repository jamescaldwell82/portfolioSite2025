# Microsoft OAuth Configuration Instructions

## Azure AD App Registration Setup

1. **Go to Azure Portal**: https://portal.azure.com
2. **Navigate to**: Azure Active Directory > App registrations
3. **Find your app**: ID `8a3f9718-8537-4ccb-b6d9-716b390b7a3b`

### Authentication Settings
- **Redirect URIs**: 
  - Platform: Web
  - URI: `https://portfoliosite2025-3f6d7.firebaseapp.com/__/auth/handler`

### API Permissions
Ensure these permissions are granted:
- Microsoft Graph:
  - `openid` (Sign users in)
  - `profile` (View users' basic profile)
  - `email` (View users' email address)
  - `User.Read` (Sign in and read user profile)

### Certificates & Secrets
1. Go to "Certificates & secrets"
2. Create a new client secret (if needed)
3. **IMPORTANT**: Copy the SECRET VALUE (not the Secret ID)
4. Use this value in Firebase Console

## Firebase Console Setup

1. **Go to**: https://console.firebase.google.com
2. **Select project**: portfoliosite2025-3f6d7
3. **Navigate to**: Authentication > Sign-in method
4. **Click**: Microsoft provider
5. **Configure**:
   - Client ID: `8a3f9718-8537-4ccb-b6d9-716b390b7a3b`
   - Client Secret: [Use the VALUE from Azure AD, not the ID]

## Common Issues

1. **Using Secret ID instead of Secret Value**: Make sure you're using the actual secret value
2. **Expired Secret**: Client secrets expire, create a new one if needed
3. **Wrong Redirect URI**: Must match exactly: `https://[project-id].firebaseapp.com/__/auth/handler`
4. **Platform Type**: Must be configured as "Web" platform, not "Single Page Application"

## Testing

After updating the configuration:
1. Wait a few minutes for changes to propagate
2. Try signing in with Microsoft again
3. Check browser network tab for detailed error messages if issues persist
