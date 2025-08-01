import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  Box,
  CircularProgress,
} from '@mui/material'
import './App.css'
import { useAuth } from './lib/AuthProvider'
import Navigation from './components/Navigation'
import AuthModal from './components/AuthModal'
import PageTransition from './components/PageTransition'
import AnimatedRoadmapBackground from './components/AnimatedRoadmapBackground'

// Import page components
import Home from './pages/Home'
import Bio from './pages/Bio'
import Resume from './pages/Resume'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Learn from './pages/Learn'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { loading } = useAuth()
  const location = useLocation()

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
    <Box sx={{ 
      bgcolor: '#000', // Dark background for the animated roadmap
      minHeight: '100vh', 
      width: '100%', 
      margin: 0, 
      padding: 0 
    }}>
      {/* Site-wide animated roadmap background */}
      <AnimatedRoadmapBackground intensity="normal" />
      
      <Navigation onAuthModalOpen={() => setAuthModalOpen(true)} />
      
      <PageTransition>
        <Box key={location.pathname} sx={{ 
          width: '100%', 
          margin: 0, 
          padding: 0,
          position: 'relative',
          zIndex: 1 // Ensure content is above background
        }}>
          {location.pathname === '/' && <Home />}
          {location.pathname === '/bio' && <Bio />}
          {location.pathname === '/resume' && <Resume />}
          {location.pathname === '/projects' && <Projects />}
          {location.pathname === '/blog' && <Blog />}
          {location.pathname === '/learn' && <Learn />}
          {location.pathname === '/contact' && <Contact />}
          {/* 404 - Catch all unmatched routes */}
          {!['/bio', '/resume', '/projects', '/blog', '/learn', '/contact', '/'].includes(location.pathname) && <NotFound />}
        </Box>
      </PageTransition>

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </Box>
  )
}

export default App
