import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  Box,
  CircularProgress,
} from '@mui/material'
import './App.css'
import { useAuth } from './lib/AuthProvider'
import Navigation from './components/Navigation'
import AuthModal from './components/AuthModal'

// Import page components
import Home from './pages/Home'
import Bio from './pages/Bio'
import Resume from './pages/Resume'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Learn from './pages/Learn'
import Contact from './pages/Contact'

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const { loading } = useAuth()

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
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Navigation onAuthModalOpen={() => setAuthModalOpen(true)} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bio" element={<Bio />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </Box>
  )
}

export default App
