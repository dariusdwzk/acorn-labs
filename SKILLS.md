# SKILLS.md — which skill to use, and when

Use **one skill per job**. Only skills from official or well-known sources are allowed (see AGENTS.md rule 7).

| Job | Skill | Source |
|---|---|---|
| Clarify requirements before a phase | `grill-me` | mattpocock/skills (in `.agents/skills`) |
| Turn a phase into steps | Plan mode + `superpowers:writing-plans` | obra/superpowers |
| Write logic | `superpowers:test-driven-development` | obra/superpowers |
| Debug a failure | `superpowers:systematic-debugging` | obra/superpowers |
| Before saying "done" | `superpowers:verification-before-completion` | obra/superpowers |
| Figma → code | Figma MCP + `figma-design-to-code` | Figma (official) |
| Expo / EAS practices | Expo skills | expo/skills (official) |
| React Native patterns & performance | `vercel-react-native-skills` | vercel-labs/agent-skills |
| Supabase, Auth, RLS, Postgres | `supabase`, `supabase-postgres-best-practices` | supabase/agent-skills (official) |
| Review before a PR | `/code-review`, `/security-review`, `/simplify` | Anthropic built-ins |
| Accessibility check | `design:accessibility-review` | Anthropic plugin |
| End of session | `handoff` | mattpocock/skills |

**Adding a skill:** read its `SKILL.md` first, install from an official repo, record it in `skills-lock.json`, add a row here.
**Not used:** web/marketing design skills — they conflict with matching Figma exactly.
