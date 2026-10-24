# 0008 — Native Google sign-in with `signInWithIdToken`

**Status:** accepted
**Context:** The product spec wants Apple/Google sign-in. Supabase offers a browser OAuth flow (`signInWithOAuth` + `expo-web-browser`) or exchanging a native ID token (`signInWithIdToken`).
**Decision:** Use `@react-native-google-signin/google-signin` and exchange its ID token with `signInWithIdToken` (`src/features/auth/useGoogleSignIn.ts`). Native gives the system account picker and no redirect/deep-link handling. We skip the nonce check in Supabase because this library does not send one.
**Consequences:** Needs a dev build (not Expo Go) and three Google OAuth clients (Web, iOS, Android). Only the Web and iOS client IDs ship in the app (public); the secret stays in Supabase. A missing ID token or any failure shows a generic error; cancelling is silent. Apple follows the same pattern later and is required by App Store rules once Google is offered on iOS.
