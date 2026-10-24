# Handover — pick up here

**Branch:** `rebuild/v2` (v1 is at tag `v1-final`) · **Open PRs:** draft #1 on `dariusdwzk/acorn-labs`, and a draft to the team lead's `kubsgok/acorn` · **CI:** green

## State

- **Built (Phases 0–2, 4–8):** Expo SDK 58 app with the Welcome and Login screens (from Figma), shared UI components, theme tokens, i18n (English), Supabase email login with encrypted session storage, and a sign-in/sign-out route guard. 82 Jest tests + 11 database tests pass; `expo-doctor` clean; CI (typecheck, lint, format, tests, DB tests, audit, secret scan) green.
- **Database (Phase 3):** migration `supabase/migrations/20261024085526_onboarding_schema.sql` (profiles, consents, medications, medication_times, plants, events; RLS + least-privilege grants), tested with `npm run test:db` (no Docker). **Not applied to `acorn-dev` yet.**
- **Never seen on a device yet.** Nothing has been run in Expo Go or a simulator, and live login is untested.
- **Placeholders:** `/register` and `/forgot-password` are "coming soon" screens; Apple/Google buttons show a "coming soon" alert; signed-in screen is a placeholder with Sign out.

## Next exact steps

1. **Owner:** put the dev project's URL + publishable key in `.env.local` (`EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_KEY`), create a test user (Supabase dashboard → Authentication → Users → Add user, tick _Auto Confirm User_), run `npm start -c` with Node 22 and open in Expo Go. Compare Welcome with Figma `98:612` and Login with `141:370`; try login, restart-still-signed-in, sign out, wrong password.
2. **Owner:** apply the migration: `npx supabase login`, `npx supabase link --project-ref <ref>` (asks for the DB password), `npx supabase db push`. Then Claude generates `src/types/database.ts` (`npx supabase gen types typescript --linked`).
3. **Claude:** onboarding screens per the product spec, then dose logging + game logic (pure, tested), Home, Forest, Calendar.
4. **Owner:** enable branch protection on `main` (require PR + checks `check`, `secrets`) once ready to merge.

## Working agreement

- **Docs are enforced, not optional:** any commit/PR touching code, migrations, CI or dependencies must also update `docs/PROGRESS.md` and `docs/HANDOVER.md` (pre-commit hook + CI `docs` job, ADR 0007). Keep both current as work lands — update the _State_ and _Next exact steps_ sections, not just append.

## Environment

- Use **Node 22** for this project: `export PATH=/opt/homebrew/opt/node@22/bin:$PATH`. Machine default is Node 26 (Homebrew); both work. Details: `docs/SETUP.md`.
- Env vars: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_KEY` (publishable key `sb_publishable_…` or legacy anon key), `EXPO_PUBLIC_TERMS_URL`. The app throws a clear error at startup if the Supabase values are missing or invalid, and refuses secret keys. Never put secrets in `EXPO_PUBLIC_*`.
- Xcode / Android Studio are not installed yet (simulators + Maestro E2E need them).

## Open items and caveats

- **Product spec** (owner, 2026-10-24) drives onboarding: Apple/Google-only sign-in (email stays for dev only), name + date of birth (18+ enforced in the DB; DOB is stored — owner's choice, see ADR 0006), consent + privacy notice, motivation intro, add medications, notification permission, first chest/sapling. Game rules: ±2h dose window, strict adherent day, plant states 0→7, a missed day drops one state. Its open questions are listed in the spec.
- **Apple/Google sign-in** needs an Apple Developer account, Google Cloud OAuth setup and a dev build (not Expo Go). The Figma login screen shows email/password; align the design with the spec.
- **Verify on a device:** Android keyboard behaviour (`Screen` uses no `behavior` on Android), Android hardware back, small-phone scroll, and the auth gate (`Stack.Protected` + `router.replace('/')`, only unit-tested).
- **Maestro E2E** (`e2e/*.yaml`) is written but unrun: needs a dev build, a bundle ID/package in `app.json`, and a dev test user.
- **Terms link:** with `EXPO_PUBLIC_TERMS_URL` unset the text is not tappable (no fake URL shipped). Set the real URL before release. Real bundle ID / Android package also still to choose.
- **npm audit:** 5 _high_ advisories via `@expo/cli` dev tooling; CI gates at `critical` (ADR 0005). Re-check after Expo patches.
- **Fonts:** 42dot Sans weights are ~2.6 MB each (~7.8 MB total) — subset to Latin before release.
- **Figma:** the MCP tool limit (View seat) was hit on 2026-10-24; needed data is already captured. `download_assets` node exports bake in a dark background — use per-layer assets from `get_design_context`. Design gaps (error/pressed/disabled states, password-hidden icon) are logged in `docs/DESIGN-NOTES.md`.
- **Dependabot** ignores react / react-native / expo majors (the Expo SDK dictates them); the React family is pinned exactly — use `npx expo install --fix`.
- **v1 Edge Function** `supabase/functions/claude` (Anthropic proxy) is still in the repo, unused by v2 so far; needed for the label scan or remove.
- **Before real patients:** PDPA review (the age gate may need to be 21), Singapore region for Supabase, Sentry with PII scrubbing, privacy notice + beta terms, account-deletion Edge Function (needs the service role server-side).
- `supabase/.temp` values (project ref, org id, pooler host; no secrets) remain in `main`'s git history.
- Playwright MCP output (`.playwright-mcp/`) is git-ignored.

## Key decisions

See `docs/decisions/` (ADRs 0001–0007).
