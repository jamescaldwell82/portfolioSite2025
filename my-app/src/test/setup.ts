import { afterEach, vi } from 'vitest'
import React from 'react'
import '@testing-library/jest-dom'

// Mock Firebase functions to avoid initialization issues in tests
vi.mock('../lib/firebase', () => ({
  auth: {},
  analytics: null,
}))

// Mock AuthProvider context
vi.mock('../lib/AuthProvider', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signOut: vi.fn()
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}))

vi.mock('../lib/authService', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signOut: vi.fn()
  }),
  authService: {
    signInWithEmail: vi.fn(),
    signUpWithEmail: vi.fn(),
    signInWithMicrosoft: vi.fn(),
    signOut: vi.fn()
  }
}))

// Mock React Router
vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => children,
  Link: ({ children }: { children: React.ReactNode; to?: string }) => children,
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' }),
}))

// Mock MUI components comprehensively to avoid theme and file handle issues
vi.mock('@mui/material/styles', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  createTheme: vi.fn(() => ({})),
  useTheme: vi.fn(() => ({})),
}))

// Mock common MUI components
vi.mock('@mui/material', () => ({
  Box: ({ children, ...props }: any) => React.createElement('div', props, children),
  Container: ({ children, ...props }: any) => React.createElement('div', props, children),
  Typography: ({ children, ...props }: any) => React.createElement('div', props, children),
  Button: ({ children, ...props }: any) => React.createElement('button', props, children),
  Modal: ({ children, open }: any) => open ? React.createElement('div', {}, children) : null,
  Dialog: ({ children, open }: any) => open ? React.createElement('div', {}, children) : null,
  DialogTitle: ({ children, ...props }: any) => React.createElement('div', props, children),
  DialogContent: ({ children, ...props }: any) => React.createElement('div', props, children),
  Card: ({ children, ...props }: any) => React.createElement('div', props, children),
  CardContent: ({ children, ...props }: any) => React.createElement('div', props, children),
  Paper: ({ children, ...props }: any) => React.createElement('div', props, children),
  TextField: (props: any) => React.createElement('input', props),
  Tabs: ({ children, ...props }: any) => React.createElement('div', props, children),
  Tab: ({ children, ...props }: any) => React.createElement('button', props, children),
  AppBar: ({ children, ...props }: any) => React.createElement('nav', props, children),
  Toolbar: ({ children, ...props }: any) => React.createElement('div', props, children),
  IconButton: ({ children, ...props }: any) => React.createElement('button', props, children),
  Menu: ({ children, open }: any) => open ? React.createElement('div', {}, children) : null,
  MenuItem: ({ children, ...props }: any) => React.createElement('div', props, children),
  ListItemIcon: ({ children, ...props }: any) => React.createElement('div', props, children),
  ListItemText: ({ children, ...props }: any) => React.createElement('div', props, children),
  Avatar: (props: any) => React.createElement('div', props),
  Divider: () => React.createElement('hr'),
  Alert: ({ children, ...props }: any) => React.createElement('div', props, children),
  CircularProgress: (props: any) => React.createElement('div', props, 'Loading...'),
  InputAdornment: ({ children, ...props }: any) => React.createElement('span', props, children),
}))

// Mock MUI Icons to prevent file handle exhaustion
vi.mock('@mui/icons-material', () => ({
  Menu: () => React.createElement('div', {}, 'MenuIcon'),
  AccountCircle: () => React.createElement('div', {}, 'AccountCircleIcon'),
  Settings: () => React.createElement('div', {}, 'SettingsIcon'),
  Logout: () => React.createElement('div', {}, 'LogoutIcon'),
  Close: () => React.createElement('div', {}, 'CloseIcon'),
  Visibility: () => React.createElement('div', {}, 'VisibilityIcon'),
  VisibilityOff: () => React.createElement('div', {}, 'VisibilityOffIcon'),
  Microsoft: () => React.createElement('div', {}, 'MicrosoftIcon'),
  Login: () => React.createElement('div', {}, 'LoginIcon'),
  // Mock any other icons that might be used
}))

afterEach(() => {
  vi.clearAllMocks()
})
