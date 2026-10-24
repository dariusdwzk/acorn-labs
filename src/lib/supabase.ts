import 'react-native-url-polyfill/auto'
import { AppState } from 'react-native'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseConfig } from './config'
import { secureStorage } from './secureStorage'

let client: SupabaseClient | null = null

/** The single Supabase client. Created on first use so config errors surface with a clear message. */
export function getSupabase(): SupabaseClient {
  if (client) return client
  const { url, anonKey } = getSupabaseConfig()
  client = createClient(url, anonKey, {
    auth: {
      storage: secureStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  })
  // Refresh tokens only while the app is in the foreground (Supabase's recommended RN setup).
  AppState.addEventListener('change', (state) => {
    if (state === 'active') void client?.auth.startAutoRefresh()
    else void client?.auth.stopAutoRefresh()
  })
  return client
}
