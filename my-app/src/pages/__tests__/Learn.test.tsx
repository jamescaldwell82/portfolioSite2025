import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Learn from '../Learn'

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

describe('Learn', () => {
  it('renders learn page content', () => {
    renderWithProviders(<Learn />)
    
    expect(screen.getByText(/This is the Learn page/)).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Learn />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
