import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { authService } from '../lib/authService';

const AuthTroubleshoot: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testMicrosoftAuth = async () => {
    setIsLoading(true);
    setTestResult('');
    
    try {
      await authService.signInWithMicrosoft();
      setTestResult('Microsoft authentication successful!');
    } catch (error: any) {
      console.error('Test failed:', error);
      setTestResult(`Error: ${error.message}\nCode: ${error.code}\nDetails: ${JSON.stringify(error, null, 2)}`);
    } finally {
      setIsLoading(false);
    }
  };

  const commonIssues = [
    {
      title: 'Invalid Client Secret (AADSTS7000215)',
      solutions: [
        'Verify you\'re using the client secret VALUE, not the secret ID',
        'Check if the client secret has expired in Azure AD',
        'Create a new client secret in Azure AD and update Firebase',
        'Ensure the secret is copied correctly without extra spaces'
      ]
    },
    {
      title: 'Redirect URI Mismatch',
      solutions: [
        'Verify redirect URI in Azure AD: https://portfoliosite2025-3f6d7.firebaseapp.com/__/auth/handler',
        'Ensure it\'s configured as "Web" platform, not "SPA"',
        'Check for typos in the domain name',
        'Wait a few minutes after making changes'
      ]
    },
    {
      title: 'Pop-up Blocked or Closed',
      solutions: [
        'Allow pop-ups in your browser settings',
        'Try signing in from an incognito/private window',
        'Disable ad blockers temporarily',
        'Try a different browser'
      ]
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Microsoft Authentication Troubleshooting
      </Typography>
      
      <Button
        variant="contained"
        onClick={testMicrosoftAuth}
        disabled={isLoading}
        sx={{ mb: 2 }}
      >
        {isLoading ? 'Testing...' : 'Test Microsoft Sign-In'}
      </Button>

      {testResult && (
        <Alert 
          severity={testResult.includes('successful') ? 'success' : 'error'}
          sx={{ mb: 2, whiteSpace: 'pre-wrap' }}
        >
          {testResult}
        </Alert>
      )}

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Common Issues & Solutions
      </Typography>

      {commonIssues.map((issue, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">{issue.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {issue.solutions.map((solution, sIndex) => (
                <ListItem key={sIndex}>
                  <ListItemText primary={`• ${solution}`} />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}

      <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Quick Checklist:
        </Typography>
        <Typography variant="body2">
          1. ✅ Azure AD App ID: 8a3f9718-8537-4ccb-b6d9-716b390b7a3b<br/>
          2. ❓ Client secret is the VALUE (not ID) from Azure AD<br/>
          3. ❓ Redirect URI: https://portfoliosite2025-3f6d7.firebaseapp.com/__/auth/handler<br/>
          4. ❓ Platform type is "Web" in Azure AD<br/>
          5. ❓ Required permissions are granted in Azure AD
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthTroubleshoot;
