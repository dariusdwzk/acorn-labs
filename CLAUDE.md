@AGENTS.md

# Claude Code specifics

- **Grill first.** Before coding a phase, ask all clarifying questions in one batch (`grill-me`). Don't guess requirements.
- **Plan, then build.** Use plan mode for anything touching more than ~3 files. Wait for approval.
- **Smallest step that compiles.** Avoid fluff; no unrequested features or refactors.
- **Tests first** for logic (`superpowers:test-driven-development`). Show `npm run check` output before claiming done (`superpowers:verification-before-completion`).
- **Design work:** implement from Figma via the Figma MCP, mapped to `src/theme` tokens. Never hard-code values. Log any deviation from the design in `docs/DESIGN-NOTES.md`.
- **Never** read `.env*`, force-push, or run destructive DB commands. Ask first.
- **Don't commit or push** until the owner says so.

## Token efficiency
- One phase per session. `/clear` between phases; resume from `docs/HANDOVER.md`.
- Use Explore subagents for broad searches; read only the files you need.
- Don't paste long files or logs back; reference by path.
- End a session with the `handoff` skill, then update `docs/HANDOVER.md`.
