# ServiceOps Resolution Gate

Independent synthetic candidate demonstrator exploring evidence-backed service-operations decision readiness.

## Current phase

**P0 — Repository Foundation + Freeze Baseline.**

Business logic is intentionally not implemented yet. The repository currently establishes the React/TypeScript/Vite toolchain, test/security/deployment baseline, and frozen project contracts.

## Safety boundary

This is not a Scheidt & Bachmann product, internal system, architecture representation, or production integration. It uses synthetic scenarios and public role/company context only.

## Planned decision routes

Future approved phases will model three human-owned decisions:

- L1 resolve
- L2/L3 escalate
- field dispatch

The deterministic gate may block an unsupported decision but will not perform real operational actions.

## P0 verification

```bash
npm ci
npm run format:check
npm run lint
npm run typecheck
npm run test
npm run build
npm run verify:p0
```

Playwright is installed/configured in P0 for later UI gates; full browser E2E is not a P0 acceptance requirement.
