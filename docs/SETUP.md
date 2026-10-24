# Local setup

## 1. Node 22 (required — Expo SDK 58 needs Node ≥ 22.13 or 24.3+; Node 25 is unsupported)

```bash
brew install node@22
echo 'export PATH="/opt/homebrew/opt/node@22/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
node -v   # v22.x
```

## 2. Install and run

```bash
npm ci
cp .env.example .env.local   # fill in your DEV Supabase URL + anon key (never a secret)
npm start                    # scan the QR with Expo Go on a real iPhone / Android phone
npm run check                # typecheck + lint + format + tests — run before every commit
```

## 3. iOS Simulator (needs a Mac)

1. Install **Xcode** from the Mac App Store (~15 GB, takes a while). Open it once and accept the license.
2. Point the command-line tools at it and finish setup:
   ```bash
   sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
   sudo xcodebuild -runFirstLaunch
   ```
3. Xcode → Settings → **Components** (or Platforms) → download the latest **iOS** simulator runtime.
4. Verify: `xcrun simctl list devices` lists iPhones. Then `npm run ios`.

## 4. Android Emulator

1. Install **Android Studio** from developer.android.com/studio and open it once (it downloads the SDK).
2. Settings → Languages & Frameworks → Android SDK: install the latest **Android SDK Platform**, **Platform-Tools**, and **Emulator**.
3. Device Manager → **Create Virtual Device** (e.g. Pixel 8, latest system image) → start it.
4. Add to `~/.zshrc`:
   ```bash
   export ANDROID_HOME="$HOME/Library/Android/sdk"
   export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator"
   ```
5. Verify: `adb devices` lists the emulator. Then `npm run android`.

## 5. Google sign-in (native)

Google sign-in needs a **dev build**, not Expo Go (`npx expo run:ios`). Setup is one-off:

1. Google Cloud → Google Auth Platform: consent screen **External**, left in _Testing_ with your test Gmail under **Audience → Test users**.
2. Create three OAuth clients: **Web** (client ID + secret), **iOS** (bundle ID `com.acornlabs.app`), **Android** (package `com.acornlabs.app` + the SHA-1 of the signing key; the Expo debug keystore's is `5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25`). Release builds (EAS, Play Store) have their own SHA-1, so add an Android client for each.
3. Supabase → Authentication → Sign In / Providers → Google: enable it, paste the Web client ID and secret, list all three client IDs comma-separated (Web first), and turn on **Skip nonce check**. The secret lives only here, never in the app or git.
4. Set `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` and `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID` in `.env.local` (client IDs are public). The iOS URL scheme (the reversed iOS client ID) is set in `app.json`.

Before real users sign in, move the consent screen from _Testing_ to _Production_.

## 6. Optional local tools

- `brew install gitleaks` — runs a secret scan on every commit (CI scans regardless).
- Expo Go on a physical phone works without Xcode/Android Studio and is enough for most UI work.

## 7. End-to-end tests (later)

See `e2e/README.md` — Maestro flows are written but need a dev build, a bundle ID and a dev test user.
