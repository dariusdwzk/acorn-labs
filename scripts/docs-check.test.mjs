import { test } from 'node:test'
import assert from 'node:assert/strict'
import { missingDocs } from './docs-check.mjs'

const BOTH = ['docs/PROGRESS.md', 'docs/HANDOVER.md']

test('code change without docs is flagged', () => {
  assert.deepEqual(missingDocs(['src/lib/config.ts']), BOTH)
})

test('only the missing doc is reported', () => {
  assert.deepEqual(missingDocs(['app/_layout.tsx', 'docs/PROGRESS.md']), ['docs/HANDOVER.md'])
})

test('code plus both docs passes', () => {
  assert.deepEqual(missingDocs(['supabase/migrations/1_x.sql', ...BOTH]), [])
})

test('docs-only and unrelated changes pass', () => {
  assert.deepEqual(missingDocs(['docs/SETUP.md', 'README.md', '__tests__/x.test.ts']), [])
})

test('CI, dependency and app config changes count as code', () => {
  for (const f of ['.github/workflows/ci.yml', 'package.json', 'app.json', 'e2e/login.yaml']) {
    assert.deepEqual(missingDocs([f]), BOTH, f)
  }
})
