# Handover — pick up here

**Branch:** `rebuild/v2` · **Phase:** 2, 4–8 done · next Phase 9 (stubs, E2E, review) · Phase 3 blocked on owner (acorn-dev Supabase project) · hero SVGs in `assets/svg/hero/` · **Last commit:** see `git log` (Phase 2 commit)

## State

- Working Expo SDK 58 scaffold; `npm run check` green; bundles for iOS + Android. Minimal placeholder screen only.
- Needs **Node 22** (`export PATH=/opt/homebrew/opt/node@22/bin:$PATH`); machine default is Node 25 (unsupported). See `docs/SETUP.md`.
- Official skills installed and pinned (Expo x3, Supabase x2, React Native x1).

## Next exact step

0. Run on a phone (`npm start`, Expo Go) and compare Welcome with Figma `98:612` — nothing has been seen on a device yet. Compare Login with `141:370` too. Then create `.env.local` (acorn-dev URL + publishable key) and a test user to try login live: log in → Home, kill app → still signed in, Sign out → Welcome, wrong password → friendly message.

1. Owner: open a PR `rebuild/v2` → `main` early (or push and let CI run), confirm CI green, then enable branch protection (Settings → Branches → require PR + status checks `check`, `secrets`).
2. Owner: create free `acorn-dev` Supabase project (Phase 3), install Xcode + Android Studio per `docs/SETUP.md`.
3. Phase 3: Supabase CLI, baseline migration from `supabase-schema.sql`/prod, dev project, generated types.

## Open items

- Owner to provide Welcome/Login SVGs in `design/svg/` (Phase 4).
- Create free `acorn-dev` Supabase project (Phase 3).
- Real Terms URL; real bundle ID / Android package (currently `com.anonymous.acorn` in v1).
- Authorize `context7` MCP via `/mcp` (optional).
- claude.ai connectors (AWS, Shopify, etc.) can't be disabled per project — turn off unused ones in claude.ai settings or `/mcp` to save tokens.
- Before real patients: PDPA review, Supabase region → Singapore, Sentry, privacy policy.
- `supabase/.temp` values (project ref, org id, pooler host) remain in `main` git history; no secrets, low risk.

- 5 high `npm audit` advisories via `@expo/cli` (ADR 0005). Re-check after each Expo patch; tighten CI gate to `high` when clean.
- Bundle ID / Android package not set in `app.json` yet (needed for dev builds / stores, not Expo Go).
- Xcode and Android Studio not installed on this machine yet (`docs/SETUP.md`).
- React Native / Expo versions pinned by SDK 58; Dependabot ignores majors of expo/react/react-native.

- React family pinned exactly (react/react-dom/react-test-renderer 19.3.0, RN 0.88.0). Don't bump one without the others; use `npx expo install --fix`.

- 42dot Sans weights are ~2.6 MB each (include Korean glyphs) → ~7.8 MB of fonts in the bundle. Optimize later (Latin subset) before release.

- **Figma MCP limit reached** (View seat, Professional plan) on 2026-10-24: further Figma tool calls may fail until it resets. Needed Welcome/Login data is already captured; avoid re-fetching.
- Layer SVGs export at node-bounding-box size (e.g. meadow-1 is 366×267 though its node is 470×267) — check each against its Figma position when composing the hero.

- `app/index.tsx` is a temporary redirect to `/welcome`; `/register`, `/forgot-password` are `ComingSoon` placeholders (Phase 9 refines). Login is built but its submit is a no-op until Phase 8, which also replaces the redirect with the auth gate; Phase 9 refines the stubs.
- Figma `download_assets` node exports include a baked dark background — use the clean per-layer assets from `get_design_context` instead.
- Playwright MCP output (`.playwright-mcp/`) is git-ignored.

- Login now calls Supabase (`useLogin`). Untested live — needs `.env.local`. The app **throws at startup** with a clear message if the Supabase env is missing/invalid (by design).
- Auth-gate navigation (`Stack.Protected` + `router.replace('/')`) is only unit-tested; verify on a device.
- Supabase email confirmation setting affects login: unconfirmed users get "confirm your email".

- `e2e/*.yaml` Maestro flows are **unrun**. Need: bundle ID/package in `app.json`, dev build, dev test user.

## Key decisions

See `docs/decisions/`.
