import { Alert } from 'react-native'
import { fireEvent, render, screen } from '@testing-library/react-native'
import '@/i18n'
import { LoginScreen } from '@/features/auth/LoginScreen'

const mockRouter = { push: jest.fn(), back: jest.fn(), replace: jest.fn(), canGoBack: jest.fn() }
jest.mock('expo-router', () => ({ useRouter: () => mockRouter }))
jest.mock(
  'react-native-safe-area-context',
  () => jest.requireActual('react-native-safe-area-context/jest/mock').default,
)

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockRouter.canGoBack.mockReturnValue(true)
  })

  it('renders the heading and form', async () => {
    await render(<LoginScreen />)
    expect(screen.getByRole('header')).toHaveTextContent('Welcome back')
    expect(screen.getByText('Log in to Acorn Labs to track your medications.')).toBeOnTheScreen()
    expect(screen.getByLabelText('Email address')).toBeOnTheScreen()
  })

  it('goes back, or to Welcome when there is no history', async () => {
    await render(<LoginScreen />)
    await fireEvent.press(screen.getByRole('button', { name: 'Go back' }))
    expect(mockRouter.back).toHaveBeenCalled()

    mockRouter.canGoBack.mockReturnValue(false)
    await fireEvent.press(screen.getByRole('button', { name: 'Go back' }))
    expect(mockRouter.replace).toHaveBeenCalledWith('/welcome')
  })

  it('navigates to forgot password and register', async () => {
    await render(<LoginScreen />)
    await fireEvent.press(screen.getByRole('link', { name: 'Forgot password?' }))
    expect(mockRouter.push).toHaveBeenLastCalledWith('/forgot-password')
    await fireEvent.press(screen.getByRole('link', { name: 'Create an account' }))
    expect(mockRouter.push).toHaveBeenLastCalledWith('/register')
  })

  it('tells the user social sign-in is coming soon', async () => {
    const alert = jest.spyOn(Alert, 'alert').mockImplementation(() => {})
    await render(<LoginScreen />)
    await fireEvent.press(screen.getByRole('button', { name: 'Continue with Apple' }))
    expect(alert).toHaveBeenCalledWith('Apple and Google sign-in are coming soon.')
  })
})
