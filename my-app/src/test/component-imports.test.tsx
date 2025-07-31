import { describe, it, expect } from 'vitest'

describe('Component Tests', () => {
  it('should import components without errors', async () => {
    // Test that components can be imported without throwing errors
    const { default: Navigation } = await import('../components/Navigation')
    const { default: PageLayout } = await import('../components/PageLayout')
    const { default: AuthModal } = await import('../components/AuthModal')
    const { default: UserProfile } = await import('../components/UserProfile')
    
    expect(Navigation).toBeDefined()
    expect(PageLayout).toBeDefined()
    expect(AuthModal).toBeDefined()
    expect(UserProfile).toBeDefined()
  })

  it('should import page components without errors', async () => {
    const { default: Home } = await import('../pages/Home')
    const { default: Bio } = await import('../pages/Bio')
    const { default: Resume } = await import('../pages/Resume')
    const { default: Projects } = await import('../pages/Projects')
    const { default: Blog } = await import('../pages/Blog')
    const { default: Learn } = await import('../pages/Learn')
    const { default: Contact } = await import('../pages/Contact')
    
    expect(Home).toBeDefined()
    expect(Bio).toBeDefined()
    expect(Resume).toBeDefined()
    expect(Projects).toBeDefined()
    expect(Blog).toBeDefined()
    expect(Learn).toBeDefined()
    expect(Contact).toBeDefined()
  })

  it('should import services without errors', async () => {
    const authService = await import('../lib/authService')
    const firebase = await import('../lib/firebase')
    
    expect(authService).toBeDefined()
    expect(firebase).toBeDefined()
  })

  it('validates component function types', async () => {
    const { default: Navigation } = await import('../components/Navigation')
    const { default: PageLayout } = await import('../components/PageLayout')
    
    expect(typeof Navigation).toBe('function')
    expect(typeof PageLayout).toBe('function')
  })

  it('validates page component function types', async () => {
    const { default: Home } = await import('../pages/Home')
    const { default: Bio } = await import('../pages/Bio')
    
    expect(typeof Home).toBe('function')
    expect(typeof Bio).toBe('function')
  })
})
