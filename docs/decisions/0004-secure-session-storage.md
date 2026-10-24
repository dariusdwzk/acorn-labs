# 0004 — Session tokens in encrypted storage

**Status:** accepted
**Context:** v1 stored Supabase session tokens in AsyncStorage (unencrypted) in a health app.
**Decision:** Use Supabase's `LargeSecureStore` pattern on expo-secure-store (Keychain / Keystore).
**Consequences:** Stronger token protection; small wrapper to maintain.
