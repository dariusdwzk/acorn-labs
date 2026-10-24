import { act, renderHook } from '@testing-library/react-native'
import { useGoogleSignIn } from '@/features/auth/useGoogleSignIn'

const mockGoogleSignIn = jest.fn()
const mockSignInWithIdToken = jest.fn()
const mockReplace = jest.fn()
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: { configure: jest.fn(), signIn: (...args: unknown[]) => mockGoogleSignIn(...args) },
  isSuccessResponse: (response: { type: string }) => response.type === 'success',
}))
jest.mock('@/lib/supabase', () => ({
  getSupabase: () => ({ auth: { signInWithIdToken: mockSignInWithIdToken } }),
}))
jest.mock('expo-router', () => ({ useRouter: () => ({ replace: mockReplace }) }))

describe('useGoogleSignIn', () => {
  beforeEach(() => jest.clearAllMocks())

  it('exchanges the Google ID token with Supabase and goes to the root', async () => {
    mockGoogleSignIn.mockResolvedValue({ type: 'success', data: { idToken: 'id-token' } })
    mockSignInWithIdToken.mockResolvedValue({ error: null })
    const { result } = await renderHook(() => useGoogleSignIn())
    await act(async () => result.current.signIn())
    expect(mockSignInWithIdToken).toHaveBeenCalledWith({ provider: 'google', token: 'id-token' })
    expect(mockReplace).toHaveBeenCalledWith('/')
    expect(result.current.errorKey).toBeNull()
    expect(result.current.submitting).toBe(false)
  })

  it('does nothing when the user cancels', async () => {
    mockGoogleSignIn.mockResolvedValue({ type: 'cancelled', data: null })
    const { result } = await renderHook(() => useGoogleSignIn())
    await act(async () => result.current.signIn())
    expect(mockSignInWithIdToken).not.toHaveBeenCalled()
    expect(mockReplace).not.toHaveBeenCalled()
    expect(result.current.errorKey).toBeNull()
  })

  it('exposes a safe error key when Supabase rejects the token', async () => {
    mockGoogleSignIn.mockResolvedValue({ type: 'success', data: { idToken: 'id-token' } })
    mockSignInWithIdToken.mockResolvedValue({ error: { code: 'bad_id_token', message: 'raw' } })
    const { result } = await renderHook(() => useGoogleSignIn())
    await act(async () => result.current.signIn())
    expect(result.current.errorKey).toBe('generic')
    expect(mockReplace).not.toHaveBeenCalled()
  })

  it('shows a generic error when Google returns no ID token', async () => {
    mockGoogleSignIn.mockResolvedValue({ type: 'success', data: { idToken: null } })
    const { result } = await renderHook(() => useGoogleSignIn())
    await act(async () => result.current.signIn())
    expect(mockSignInWithIdToken).not.toHaveBeenCalled()
    expect(result.current.errorKey).toBe('generic')
  })

  it('maps a thrown Google error instead of crashing', async () => {
    mockGoogleSignIn.mockRejectedValue(new Error('play services unavailable'))
    const { result } = await renderHook(() => useGoogleSignIn())
    await act(async () => result.current.signIn())
    expect(result.current.errorKey).toBe('generic')
    expect(result.current.submitting).toBe(false)
  })
})
