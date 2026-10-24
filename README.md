# Acorn Labs

A medication-adherence app with light gamification: take your doses, keep your streak, grow a plant, fill a forest.
Built with Expo (React Native + TypeScript) and Supabase, for iOS and Android.

> **Status:** v2 rebuild in progress on `rebuild/v2`. v1 is preserved at tag `v1-final`.

## For contributors (humans and AI agents)
Start with [AGENTS.md](AGENTS.md), then [docs/HANDOVER.md](docs/HANDOVER.md) and [docs/PROGRESS.md](docs/PROGRESS.md).

## Setup (available after Phase 2)
```bash
nvm use                      # Node version from .nvmrc
npm ci
cp .env.example .env.local   # fill in your DEV Supabase URL + anon key
npm start
```
**Never put secrets in `EXPO_PUBLIC_*` variables** — they are bundled into the app.
