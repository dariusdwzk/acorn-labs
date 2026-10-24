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

## 5. Optional local tools

- `brew install gitleaks` — runs a secret scan on every commit (CI scans regardless).
- Expo Go on a physical phone works without Xcode/Android Studio and is enough for most UI work.

## 6. End-to-end tests (later)

See `e2e/README.md` — Maestro flows are written but need a dev build, a bundle ID and a dev test user.
