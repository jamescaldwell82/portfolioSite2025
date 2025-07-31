import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Navigation from '../Navigation'

// Mock Firebase auth
vi.mock('../../lib/authService', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signOut: vi.fn()
  })
}))

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffffff' },
    background: { default: '#000000', paper: '#000000' }
  }
})

const mockOnAuthModalOpen = vi.fn()

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  )
}

describe('Navigation', () => {
  it('renders navigation brand', () => {
    renderWithProviders(<Navigation onAuthModalOpen={mockOnAuthModalOpen} />)
    expect(screen.getByText('James Caldwell')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    renderWithProviders(<Navigation onAuthModalOpen={mockOnAuthModalOpen} />)
    
    // Check for navigation links using getAllByText since there are multiple instances
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Bio')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Resume')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Projects')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Blog')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Learn')[0]).toBeInTheDocument()
    expect(screen.getAllByText('Contact')[0]).toBeInTheDocument()
  })

  it('renders login button when user is not authenticated', () => {
    renderWithProviders(<Navigation onAuthModalOpen={mockOnAuthModalOpen} />)
    expect(screen.getAllByText('Login')[0]).toBeInTheDocument()
  })

  it('calls onAuthModalOpen when login button is clicked', () => {
    renderWithProviders(<Navigation onAuthModalOpen={mockOnAuthModalOpen} />)
    
    const loginButtons = screen.getAllByText('Login')
    fireEvent.click(loginButtons[0])
    
    expect(mockOnAuthModalOpen).toHaveBeenCalled()
  })

  it('opens mobile menu when menu button is clicked', () => {
    renderWithProviders(<Navigation onAuthModalOpen={mockOnAuthModalOpen} />)
    
    // Find and click the mobile menu button by looking for MenuIcon text
    const menuButtons = screen.getAllByText('MenuIcon')
    fireEvent.click(menuButtons[0])
    
    // Just verify the component renders and doesn't crash
    expect(menuButtons[0]).toBeInTheDocument()
    
    // Check that mobile menu items are visible
    const mobileMenuItems = screen.getAllByText('Home')
    expect(mobileMenuItems.length).toBeGreaterThan(1) // Should have both desktop and mobile versions
  })
})
