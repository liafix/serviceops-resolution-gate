# Change Gate

The following contracts are frozen after approved PASS 4 / PASS 5 and require an explicit change request before modification:

- research question and hypotheses
- the eight scenario purposes and ground-truth route intent
- KPI definitions
- success/failure thresholds
- safety boundaries
- MVP in-scope and out-of-scope boundaries
- decision routes (`L1_RESOLVE`, `L2_L3_ESCALATE`, `FIELD_DISPATCH`)
- deterministic `READY | BLOCKED` gate semantics
- state-machine semantics
- baseline-vs-treatment fairness rule
- audit/KPI derivation principle
- assumption-driven ROI principle
- browser-first static deployment model

## Change request template

1. Proposed change
2. Why the frozen contract is insufficient
3. Research-validity impact
4. Safety impact
5. Scope/cost impact
6. Required test changes
7. Explicit approval before implementation

Until approved, implementation must conform to the frozen documents rather than silently changing them to make the demo easier or prettier.
