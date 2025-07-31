import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Blog from '../Blog'

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

describe('Blog', () => {
  it('renders blog page content', () => {
    renderWithProviders(<Blog />)
    
    expect(screen.getByText(/This is the Blog page/)).toBeInTheDocument()
  })

  it('renders without crashing', () => {
    const { container } = renderWithProviders(<Blog />)
    expect(container.firstChild).toBeInTheDocument()
  })
})
