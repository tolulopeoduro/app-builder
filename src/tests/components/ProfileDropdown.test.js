import { render, screen } from '@testing-library/vue'
import { describe, expect } from 'vitest'
import ProfileDropdown from '../../components/ProfileDropdown.vue'

describe('ProfileDropDown', () => {
  it('shows user onboarding options', () => {
    render(ProfileDropdown)
    const links = screen.getAllByRole('link').map((link) => link.textContent)
    expect(links).toEqual([' SIGN IN', ' SIGN UP'])
  })
})
