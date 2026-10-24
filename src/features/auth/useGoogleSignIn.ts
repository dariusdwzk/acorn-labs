import { useCallback, useState } from 'react'
import { useRouter } from 'expo-router'
import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin'
import { config } from '@/lib/config'
import { getSupabase } from '@/lib/supabase'
import { toLoginErrorKey, type LoginErrorKey } from './authErrors'

/** Signs in with Google natively, then trades the Google ID token for a Supabase session. */
export function useGoogleSignIn() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [errorKey, setErrorKey] = useState<LoginErrorKey | null>(null)

  const signIn = useCallback(async () => {
    setSubmitting(true)
    setErrorKey(null)
    try {
      GoogleSignin.configure({
        webClientId: config.googleWebClientId,
        iosClientId: config.googleIosClientId,
      })
      const response = await GoogleSignin.signIn()
      // The user closing the Google sheet is not an error.
      if (!isSuccessResponse(response)) return
      const token = response.data.idToken
      if (!token) {
        setErrorKey('generic')
        return
      }
      const { error } = await getSupabase().auth.signInWithIdToken({ provider: 'google', token })
      if (error) setErrorKey(toLoginErrorKey(error))
      else router.replace('/')
    } catch (error) {
      setErrorKey(toLoginErrorKey(error))
    } finally {
      setSubmitting(false)
    }
  }, [router])

  return { signIn, submitting, errorKey }
}
