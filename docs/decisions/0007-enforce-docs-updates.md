# 0007 — Enforce progress/handover updates with a hook and CI

**Status:** accepted (owner request, 2026-10-24)
**Context:** Instructions in CLAUDE.md and agent memory ("update docs as you go") get forgotten, and the handover file drifted out of date once already.
**Decision:** `scripts/docs-check.mjs` fails when a change touches code (`src/`, `app/`, `supabase/migrations|functions`, `e2e/`, `.github/workflows`, `package.json`, `app.json`) without also changing `docs/PROGRESS.md` and `docs/HANDOVER.md`. It runs in the pre-commit hook (staged files; local bypass `SKIP_DOCS_CHECK=1`) and in CI on pull requests (no bypass; Dependabot exempt). Unit-tested with `npm run test:scripts`.
**Consequences:** Every code commit carries at least a short docs touch. It can't verify the docs are _accurate_ — that stays a review item (PR template checklist). Docs-only and test-only changes are not blocked.
