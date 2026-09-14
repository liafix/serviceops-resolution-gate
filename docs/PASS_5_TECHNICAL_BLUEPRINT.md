# PASS 5 — Frozen Technical Blueprint

Status: **FROZEN / APPROVED**

## Architecture decision

Browser-first, deterministic, zero-external-runtime candidate demonstrator.

Target stack:

- React 19
- TypeScript strict mode
- Vite
- Vitest
- Playwright
- Zod
- ESLint + Prettier
- Vercel static deployment

No database, external API, environment secret, AI provider, production device connection, Salesforce connection, Jira connection, or monitoring integration is required for the MVP.

## Frozen logical layers

1. Presentation
2. Application workflow
3. Deterministic Resolution Gate
4. Experiment engine
5. Domain layer
6. Analytics / ROI

## Frozen domain concepts for P1+

`IncidentScenario`, `IncidentSession`, `EvidenceItem`, `DiagnosticAction`, `DiagnosticResult`, `DecisionRoute`, `GateRule`, `GateEvaluation`, `ValidationCheck`, `HandoffPackage`, `AuditEvent`, `ExperimentRun`, `MetricResult`, `ROIInputs`.

P0 must **not** implement these concepts beyond documenting their frozen names.

## Frozen state-machine intent for P4+

`QUEUED → INVESTIGATING → DECISION_ATTEMPT`, followed by L1 validation, L2/L3 handoff, field-dispatch handoff, or Treatment `BLOCKED → INVESTIGATING`.

## Frozen gate semantics for P3+

Gate output is deterministic `READY | BLOCKED`. It reports satisfied rules, failed rules, missing evidence, contradictions, reason codes, and evidence references. No probabilistic AI confidence score is authoritative.

## Frozen experiment intent for P5+

Baseline and Treatment receive identical frozen scenario reality. Treatment differs only by gate enforcement. A participant must not solve the same scenario in both conditions.

## Frozen analytics intent for P6+

KPIs derive from audit events plus frozen scenario ground truth, not mutable UI state. ROI uses user-defined assumptions and must be labelled illustrative, not company financial data.

## Frozen deployment intent

Static Vite build on Vercel, no required environment variables, no database, no external runtime services.
