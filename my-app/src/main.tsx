import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import App from './App.tsx'
import { FirebaseProvider } from './lib/FirebaseProvider.tsx'
import { AuthProvider } from './lib/AuthProvider.tsx'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
    divider: '#333333',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: 'clamp(2rem, 5vw, 4rem)',
    },
    h2: {
      fontWeight: 600,
      fontSize: 'clamp(1.5rem, 4vw, 3rem)',
    },
    h3: {
      fontWeight: 600,
      fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
    },
    h4: {
      fontWeight: 500,
      fontSize: 'clamp(1.125rem, 2.5vw, 2rem)',
    },
    h5: {
      fontWeight: 500,
      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
    },
    h6: {
      fontWeight: 500,
      fontSize: 'clamp(0.875rem, 1.5vw, 1.25rem)',
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '100% !important',
          paddingLeft: '0 !important',
          paddingRight: '0 !important',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          borderBottom: '1px solid #333333',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#111111',
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
        contained: {
          backgroundColor: '#ffffff',
          color: '#000000',
          '&:hover': {
            backgroundColor: '#cccccc',
          },
        },
        outlined: {
          borderColor: '#ffffff',
          color: '#ffffff',
          '&:hover': {
            borderColor: '#cccccc',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#333333',
            },
            '&:hover fieldset': {
              borderColor: '#ffffff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffffff',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#cccccc',
          },
          '& .MuiInputBase-input': {
            color: '#ffffff',
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FirebaseProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </FirebaseProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
