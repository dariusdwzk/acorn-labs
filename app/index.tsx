import { Redirect } from 'expo-router'

// Temporary entry: always show Welcome. Replaced by the auth gate in Phase 8.
export default function Index() {
  return <Redirect href="/welcome" />
}
