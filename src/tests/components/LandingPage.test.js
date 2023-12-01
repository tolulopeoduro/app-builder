import { render, screen } from '@testing-library/vue'
import { describe, expect } from 'vitest'
import LandingPage from '../../views/LandingPage.vue'

describe('Landing Page', () => {
  it('Displays wierd boxes', () => {
    render(LandingPage)
    expect(screen.getByRole('img', { name: 'boxes' })).toBeInTheDocument()
  })
  it('Displays hero text', () => {
    render(LandingPage)
    expect(screen.getByTestId('hero-text')).toBeInTheDocument()
  })
})
