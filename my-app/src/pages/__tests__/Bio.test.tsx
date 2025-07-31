import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Bio from '../Bio'

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

describe('Bio', () => {
  it('renders bio page content', () => {
    renderWithProviders(<Bio />)
    
    expect(screen.getByText(/Welcome to my biography page/)).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Bio />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
