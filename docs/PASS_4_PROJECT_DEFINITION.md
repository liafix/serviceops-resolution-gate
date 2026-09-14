# PASS 4 — Frozen Project Definition

Status: **FROZEN / APPROVED**

## Problem

ServiceOps Resolution Gate tests whether an evidence-backed decision-readiness gate can reduce unsupported or premature operational decisions among three human-owned routes:

- `L1_RESOLVE`
- `L2_L3_ESCALATE`
- `FIELD_DISPATCH`

The project does **not** replace monitoring, ticketing, Salesforce, Jira, incident management, technician scheduling, or production remediation systems.

## Research question

Can an evidence-backed resolution gate reduce unsupported or premature operational decisions between L1 resolution, L2/L3 escalation and field dispatch without adding unacceptable decision latency?

## Frozen hypotheses

- H1: reduce decision defects by at least 50% while median Time-to-Supported-Decision worsens by no more than 15%.
- H2: zero premature L1 closures without required recovery checks.
- H3: 100% required evidence completeness for L2/L3 escalation and field dispatch.
- H4: reduce avoidable escalation/dispatch by at least 25% when baseline contains those errors.

## Frozen synthetic scenarios

Eight scenarios are reserved for P2 and may not be materially changed without an explicit Change Gate:

1. remote restart recovery → L1
2. configuration recovery → L1
3. multi-device API timeout → L2/L3
4. recurrent service degradation beyond frontline scope → L2/L3
5. persistent reader self-test failure → field dispatch
6. remote-unreachable device with physical-fault evidence → field dispatch
7. stale monitoring alert / healthy current checks → L1 false-positive closure
8. insufficient evidence → NOT READY until evidence is collected

## Frozen primary KPI

Decision Defect Rate includes wrong route, unsupported decision, premature resolution, incomplete escalation, or unjustified dispatch.

## Frozen PASS thresholds

- unsafe/premature L1 closure in treatment: 0
- final routing correctness: >= 90%
- required escalation/dispatch evidence: 100%
- audit completeness: 100%
- decision-defect reduction: >= 50%
- evidence-omission reduction: >= 70%
- avoidable escalation/dispatch reduction: >= 25% when applicable
- median time overhead: <= +15%
- false-block rate: <= 10%

## Frozen safety boundaries

- Independent candidate demonstrator only.
- Synthetic incidents and synthetic data only.
- No implication of internal Scheidt & Bachmann access or architecture knowledge.
- No real Salesforce, Jira, monitoring, device, or production integration.
- No autonomous restart, configuration, escalation, dispatch, or closure action.
- Human owns the final operational decision.
- Deterministic rules are authoritative.
- Any later AI may explain evidence only and may not change readiness state.
- No company-specific savings claims without real company data.

## Frozen MVP scope

In scope: synthetic incident queue, evidence view, decision actions, deterministic resolution gate, NOT READY state, recovery validation, evidence-backed handoff, tamper-evident audit trail, baseline/treatment experiment mode, KPI result view, and assumption-driven ROI calculator.

Out of scope: production monitoring, Salesforce/Jira clones, AIOps root-cause engine, chatbot, autonomous remediation, technician routing, predictive-maintenance ML, production integrations, enterprise auth/RBAC suite, or real company infrastructure.
