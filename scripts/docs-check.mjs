// Fails when code changes without the progress/handover docs changing alongside it.
// Used by the pre-commit hook (staged files) and CI (PR diff). Usage:
//   git diff --cached --name-only | node scripts/docs-check.mjs
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Paths that mean "the project changed" and therefore need a docs update.
const CODE_PATTERNS = [
  /^src\//,
  /^app\//,
  /^supabase\/(migrations|functions)\//,
  /^e2e\//,
  /^\.github\/workflows\//,
  /^(package|app)\.json$/,
]
const REQUIRED_DOCS = ['docs/PROGRESS.md', 'docs/HANDOVER.md']

/** Returns the docs that should have been updated (empty array = fine). */
export function missingDocs(changedFiles) {
  const touchesCode = changedFiles.some((file) => CODE_PATTERNS.some((re) => re.test(file)))
  if (!touchesCode) return []
  return REQUIRED_DOCS.filter((doc) => !changedFiles.includes(doc))
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const files = readFileSync(0, 'utf8')
    .split('\n')
    .map((f) => f.trim())
    .filter(Boolean)
  const missing = missingDocs(files)
  if (missing.length > 0) {
    console.error(
      `Docs not updated. This change touches code, so also update: ${missing.join(', ')}`,
    )
    console.error('(Emergency bypass for a local commit only: SKIP_DOCS_CHECK=1 git commit ...)')
    process.exit(1)
  }
}
