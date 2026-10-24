import { render, screen } from '@testing-library/react-native'
import '@/i18n'
import Index from '../app/index'

describe('Index screen', () => {
  it('renders the translated placeholder', async () => {
    await render(<Index />)
    expect(screen.getByRole('header')).toHaveTextContent('Acorn Labs is getting ready.')
  })
})
