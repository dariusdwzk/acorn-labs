# Progress

Checklist of phases for the v2 rebuild (first feature: Welcome + Login). Each phase ends with a short summary here.

- [x] **Phase 0 — Safety net & reset**
- [x] **Phase 1 — Docs & agent guardrails**
- [x] **Phase 2 — Scaffold + CI** _(code done; branch protection + first CI run pending)_
- [ ] Phase 3 — Database baseline (dev project, migrations, types)
- [ ] **Phase 4 — Theme, fonts, assets** _(tokens + fonts done; SVG assets waiting on owner)_
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

### Phase 2 — Scaffold + CI

- Fresh Expo SDK 58 app (React Native 0.88, TypeScript strict, expo-router, typed routes) with `app/` routes only, `src/i18n` (i18next, English), `@/` import alias.
- Tooling: ESLint (`expo lint` + Prettier, `no-console` and `no-explicit-any` as errors), Prettier, Jest + RNTL (1 passing screen test), husky + lint-staged + gitleaks pre-commit, `npm run check`.
- CI (`.github/workflows/ci.yml`): expo-doctor, typecheck, lint, format, tests+coverage, `npm audit` (critical gate), gitleaks. Plus Dependabot and PR template.
- Node pinned to 22 (`.nvmrc`, `engines`); SDK 58 does not support Node 25. Added `docs/SETUP.md`.
- Verified: `npm run check` green; `expo-doctor` 20/20; `expo export` bundles iOS + Android.
- Known: 5 high npm advisories via `@expo/cli` dev tooling — see ADR 0005.
- Not yet verified: on a device/simulator (Xcode / Android Studio not installed yet); CI on GitHub (first run happens on PR).
- Next: Phase 3 — database baseline (needs the free `acorn-dev` Supabase project).

### Phase 4 (part 1) — Theme tokens & fonts

- `src/theme/`: `colors`, `spacing`/`radius`/`minTouchTarget`, `typography` (all values from Figma), `fonts` (42dot Sans 400/500/600 + Afacad 400 via official `@expo-google-fonts`, per-weight family names for Android).
- Root layout holds the splash screen until fonts are ready (falls back to system fonts on error).
- Pinned the React family exactly to the SDK (`react` / `react-dom` / `react-test-renderer` 19.3.0, `react-native` 0.88.0) — fixes npm peer conflicts without `--legacy-peer-deps`.
- Tests: token tests (colors, scale order, touch target, every text style maps to a loaded font).
- Pending: owner's SVG illustration files → `design/svg/` (then placed via `react-native-svg`).
