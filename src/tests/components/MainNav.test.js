import { render, screen } from '@testing-library/vue'
import { expect } from 'vitest'
import MainNav from '@/components/MainNav.vue'

describe('MainNav', () => {
  it('Confirms Logo', () => {
    render(MainNav)
    screen.getByRole('img')
  })
  it('Shows Buttons', () => {
    render(MainNav)
    const buttons = screen.getAllByRole('button')
    const values = buttons.map((button) => button.textContent)
    expect(values).toEqual(['BUILD', 'SIGN IN'])
  })
  it('Shows links', () => {
    render(MainNav)
    const links = screen.getAllByRole('link')
    const links_texts = links.map((link) => link.textContent)
    expect(links_texts).toEqual(['BUILT WITH BUILDR', 'CONTRIBUTE ON GITHUB'])
  })
  it('Shows Search bar', () => {
    render(MainNav)
    const searchBar = screen.getByRole('textbox')
    expect(searchBar).toBeInTheDocument()
  })
})
