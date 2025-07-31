import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Projects from '../Projects'

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

describe('Projects', () => {
  it('renders projects page content', () => {
    renderWithProviders(<Projects />)
    
    expect(screen.getByText(/This is the Projects page/)).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Projects />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
