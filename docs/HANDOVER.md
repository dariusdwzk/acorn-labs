# Handover — pick up here

**Branch:** `rebuild/v2` · **Phase:** 1 done, awaiting commit → Phase 2 next · **Last commit:** `chore: reset to clean slate for v2 rebuild`

## State
- Clean slate: only `supabase/`, `supabase-schema.sql`, skills, tooling and docs remain. v1 is at tag `v1-final`.
- Docs written: `AGENTS.md`, `CLAUDE.md`, `SKILLS.md`, `docs/*`, `.env.example`, `.claude/settings.json`.
- Official skills installed and pinned (Expo x3, Supabase x2, React Native x1).

## Next exact step
Owner approves Phase 1 → commit + push → Phase 2 (scaffold Expo app, ESLint/Prettier, Jest, husky, CI). Start with a grill: Expo SDK version, package manager, i18n library.

## Open items
- Owner to provide Welcome/Login SVGs in `design/svg/` (Phase 4).
- Create free `acorn-dev` Supabase project (Phase 3).
- Real Terms URL; real bundle ID / Android package (currently `com.anonymous.acorn` in v1).
- Authorize `context7` MCP via `/mcp` (optional).
- claude.ai connectors (AWS, Shopify, etc.) can't be disabled per project — turn off unused ones in claude.ai settings or `/mcp` to save tokens.
- Before real patients: PDPA review, Supabase region → Singapore, Sentry, privacy policy.
- `supabase/.temp` values (project ref, org id, pooler host) remain in `main` git history; no secrets, low risk.

## Key decisions
See `docs/decisions/`.
