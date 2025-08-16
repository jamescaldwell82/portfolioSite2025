import { useState, lazy, Suspense } from 'react'
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

// Lazy load page components for better performance
const Home = lazy(() => import('./pages/Home'))
const Bio = lazy(() => import('./pages/Bio'))
const Resume = lazy(() => import('./pages/Resume'))
const Projects = lazy(() => import('./pages/Projects'))
const Blog = lazy(() => import('./pages/Blog'))
const Learn = lazy(() => import('./pages/Learn'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { loading } = useAuth()
  const location = useLocation()

  // Loading fallback component
  const PageLoader = () => (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="400px"
    >
      <CircularProgress sx={{ color: '#64ffda' }} />
    </Box>
  )

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress sx={{ color: '#64ffda' }} />
      </Box>
    )
  }

  const renderPage = () => {
    switch (location.pathname) {
      case '/':
        return <Home />
      case '/bio':
        return <Bio />
      case '/resume':
        return <Resume />
      case '/projects':
        return <Projects />
      case '/blog':
        return <Blog />
      case '/learn':
        return <Learn />
      case '/contact':
        return <Contact />
      default:
        return <NotFound />
    }
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
          <Suspense fallback={<PageLoader />}>
            {renderPage()}
          </Suspense>
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
