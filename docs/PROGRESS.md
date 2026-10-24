# Progress

Checklist of phases for the v2 rebuild (first feature: Welcome + Login). Each phase ends with a short summary here.

- [x] **Phase 0 — Safety net & reset**
- [x] **Phase 1 — Docs & agent guardrails**
- [ ] Phase 2 — Scaffold + CI
- [ ] Phase 3 — Database baseline (dev project, migrations, types)
- [ ] Phase 4 — Theme, fonts, assets
- [ ] Phase 5 — UI primitives
- [ ] Phase 6 — Welcome screen
- [ ] Phase 7 — Login UI
- [ ] Phase 8 — Real auth
- [ ] Phase 9 — Stubs, E2E, review → PR to `main`

## Phase summaries

### Phase 0 — Safety net & reset
- Tagged `main` as `v1-final` (v1 is recoverable: `git checkout v1-final`); work happens on `rebuild/v2`.
- Removed v1 app code, config and old status docs; untracked `supabase/.temp`; hardened `.gitignore` (`.env*`); pinned Node 22 in `.nvmrc`; dropped unrelated web-design skills.
- Verify: `git status` clean; `git show v1-final` still has the old app.
- Next: Phase 1.

### Phase 1 — Docs & agent guardrails
- Added `AGENTS.md` (rules for humans + AI), `CLAUDE.md`, `SKILLS.md`, `README.md`, `docs/*`, 4 ADRs, `.env.example`, `.claude/settings.json` (deny rules for `.env`, force-push, `rm -rf`, DB reset).
- Installed 6 official skills (expo-overview, expo-router, expo-project-structure, supabase, supabase-postgres-best-practices, vercel-react-native-skills) after reading each `SKILL.md`; pinned to exact commits in `skills-lock.json`.
- Verify: `ls .claude/skills`; `jq '.skills|keys' skills-lock.json`.
- Next: Phase 2 — scaffold Expo app + CI.
