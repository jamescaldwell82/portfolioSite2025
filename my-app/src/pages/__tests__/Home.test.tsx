import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Home from '../Home'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#ffffff' },
    background: { default: '#000000', paper: '#000000' }
  }
})

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('Home', () => {
  it('renders home page title', () => {
    renderWithProviders(<Home />)
    
    expect(screen.getByText('Vite + React')).toBeInTheDocument()
  })

  it('renders welcome message', () => {
    renderWithProviders(<Home />)
    
    // Check for the portfolio title using getAllByText and take the first one
    const portfolioTitles = screen.getAllByText('James Caldwell Portfolio')
    expect(portfolioTitles[0]).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Home />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
