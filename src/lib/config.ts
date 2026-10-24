/** Returns the URL only if it is a valid https URL; anything else (missing, http, junk) is null. */
export function parseHttpsUrl(value: string | undefined): string | null {
  if (!value) return null
  try {
    const url = new URL(value)
    return url.protocol === 'https:' ? url.toString() : null
  } catch {
    return null
  }
}

// EXPO_PUBLIC_* values are bundled into the app: public values only, never secrets.
export const config = {
  termsUrl: parseHttpsUrl(process.env.EXPO_PUBLIC_TERMS_URL),
} as const
