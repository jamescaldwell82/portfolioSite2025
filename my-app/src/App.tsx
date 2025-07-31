import { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  CircularProgress,
} from '@mui/material'
import { Login as LoginIcon } from '@mui/icons-material'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAuth } from './lib/AuthProvider'
import AuthModal from './components/AuthModal'
import UserProfile from './components/UserProfile'

function App() {
  const [count, setCount] = useState(0)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            James Caldwell Portfolio
          </Typography>
          {user ? (
            <UserProfile />
          ) : (
            <Button
              color="inherit"
              startIcon={<LoginIcon />}
              onClick={() => setAuthModalOpen(true)}
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Box sx={{ mb: 3 }}>
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </Box>
          
          <Typography variant="h3" component="h1" gutterBottom>
            Vite + React
          </Typography>
          
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            James Caldwell
          </Typography>

          {user && (
            <Typography variant="h6" gutterBottom color="success.main">
              Welcome, {user.displayName || user.email}!
            </Typography>
          )}

          <Box sx={{ my: 3 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Edit <code>src/App.tsx</code> and save to test HMR
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary">
            Click on the Vite and React logos to learn more
          </Typography>
        </Paper>
      </Container>

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </>
  )
}

export default App
