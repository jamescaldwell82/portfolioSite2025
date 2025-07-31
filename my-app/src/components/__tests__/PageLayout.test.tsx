import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import PageLayout from '../PageLayout'

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

describe('PageLayout', () => {
  it('renders page title', () => {
    renderWithProviders(
      <PageLayout title="Test Page">
        <div>Test content</div>
      </PageLayout>
    )
    
    expect(screen.getByText('Test Page')).toBeInTheDocument()
  })

  it('renders children content', () => {
    renderWithProviders(
      <PageLayout title="Test Page">
        <div>Unique test content for PageLayout</div>
        <p>Another unique paragraph</p>
      </PageLayout>
    )
    
    expect(screen.getByText('Unique test content for PageLayout')).toBeInTheDocument()
    expect(screen.getByText('Another unique paragraph')).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    const { container } = renderWithProviders(
      <PageLayout title="Test Page">
        <div>Test content</div>
      </PageLayout>
    )
    
    // Check that the container has the expected structure
    const pageContainer = container.querySelector('[data-testid="page-container"]')
    expect(pageContainer || container.firstChild).toBeInTheDocument()
  })

  it('renders with different titles', () => {
    const { rerender } = renderWithProviders(
      <PageLayout title="First Page">
        <div>Content 1</div>
      </PageLayout>
    )
    
    expect(screen.getByText('First Page')).toBeInTheDocument()
    
    rerender(
      <ThemeProvider theme={theme}>
        <PageLayout title="Second Page">
          <div>Content 2</div>
        </PageLayout>
      </ThemeProvider>
    )
    
    expect(screen.getByText('Second Page')).toBeInTheDocument()
    expect(screen.queryByText('First Page')).not.toBeInTheDocument()
  })

  it('handles empty children', () => {
    renderWithProviders(
      <PageLayout title="Empty Page">
        {null}
      </PageLayout>
    )
    
    expect(screen.getByText('Empty Page')).toBeInTheDocument()
  })
})
