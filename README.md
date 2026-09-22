# ServiceOps Resolution Gate

Independent synthetic candidate demonstrator for service-operations reasoning and evidence-backed routing decisions.

## Recruiter preview

The current UI is a recruiter-facing preview MVP built with React, TypeScript and Vite. It demonstrates four fictional service cases and three human-owned routing outcomes:

- L1 resolve
- L2/L3 escalate
- field dispatch

The preview focuses on structured intake, evidence review, troubleshooting logic and explicit handoff boundaries. It does not perform real operational actions.

## Safety boundary

This is not a Scheidt & Bachmann product, internal system, architecture representation or production integration. It uses synthetic scenarios and public role/company context only.

## Technical baseline

- React 19
- TypeScript strict mode
- Vite
- Vitest
- Playwright configured
- ESLint / Prettier
- Vercel deployment config

## Verification

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
```

The repository began with a frozen P0 foundation baseline; those foundation checks are retained in the repo history for traceability.
