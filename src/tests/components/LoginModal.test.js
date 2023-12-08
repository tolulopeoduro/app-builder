import { render, screen } from '@testing-library/vue'
import { describe, expect } from 'vitest'
import LoginModal from '../../components/LoginModal.vue'

describe('LoginModal', () => {
  it('Displays a login form', () => {
    render(LoginModal)
    const emailInput = screen.getByPlaceholderText(/email or username/gi)
    const passwordInput = screen.getByPlaceholderText(/password/gi)
    const submitButton = screen.getByRole('button')

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitButton).not.toBeDisabled()
  })
})
