import { useMemo, useState } from 'react';

type Route = 'L1 resolve' | 'L2/L3 escalate' | 'Field dispatch';

interface Scenario {
  id: string;
  title: string;
  location: string;
  severity: 'Low' | 'Medium' | 'High';
  source: 'Monitoring' | 'Customer';
  summary: string;
  signal: string;
  evidence: readonly string[];
  recommendedRoute: Route;
  rationale: string;
}

const scenarios: readonly [Scenario, ...Scenario[]] = [
  {
    id: 'INC-1042',
    title: 'Validator intermittently offline',
    location: 'Synthetic station A-17',
    severity: 'High',
    source: 'Monitoring',
    summary: 'Repeated connectivity loss after a recent service restart.',
    signal: '6 disconnects / 20 min',
    evidence: [
      'Device reachable between drops',
      'Restart timestamp correlates with first alert',
      'No site-wide connectivity loss detected',
      'Remote restart already attempted once',
    ],
    recommendedRoute: 'L2/L3 escalate',
    rationale:
      'The issue is reproducible and survives one reversible L1 action, so escalation carries the strongest evidence.',
  },
  {
    id: 'REQ-2098',
    title: 'Customer reports display mismatch',
    location: 'Synthetic vehicle 52',
    severity: 'Medium',
    source: 'Customer',
    summary: 'Displayed status differs from the expected service state reported by the customer.',
    signal: '1 customer request',
    evidence: [
      'Request details captured',
      'Expected state confirmed',
      'Remote status is healthy',
      'No related alerts in the same window',
    ],
    recommendedRoute: 'L1 resolve',
    rationale:
      'Available evidence points to a contained support issue with no active infrastructure alarm.',
  },
  {
    id: 'INC-3117',
    title: 'Gate controller unreachable',
    location: 'Synthetic terminal C-04',
    severity: 'High',
    source: 'Monitoring',
    summary: 'Controller remains unreachable while neighbouring devices stay online.',
    signal: 'Offline for 34 min',
    evidence: [
      'Remote reachability failed',
      'Neighbouring devices are online',
      'Power-cycle request cannot be executed remotely',
      'No remote recovery path remains',
    ],
    recommendedRoute: 'Field dispatch',
    rationale:
      'Remote recovery options are exhausted and the evidence isolates the issue to a single physical endpoint.',
  },
  {
    id: 'REQ-4410',
    title: 'Intermittent API timeout report',
    location: 'Synthetic service channel',
    severity: 'Medium',
    source: 'Customer',
    summary: 'Customer reports sporadic request timeouts without a persistent outage.',
    signal: '3 timeouts / 15 min',
    evidence: [
      'Request timestamps collected',
      'Healthy responses observed between failures',
      'No broad outage signature',
      'Correlation window prepared for deeper analysis',
    ],
    recommendedRoute: 'L2/L3 escalate',
    rationale:
      'The issue is intermittent, reproducible by evidence, and benefits from deeper technical correlation rather than field action.',
  },
];

function severityClass(severity: Scenario['severity']) {
  return `severity severity-${severity.toLowerCase()}`;
}

export function App() {
  const [selectedId, setSelectedId] = useState<string>(scenarios[0].id);
  const [decision, setDecision] = useState<Route | null>(null);

  const selected = useMemo(
    () => scenarios.find((scenario) => scenario.id === selectedId) ?? scenarios[0],
    [selectedId],
  );

  return (
    <main className="page-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Independent candidate demonstrator</p>
          <h1>ServiceOps Resolution Gate</h1>
          <p className="hero-copy">
            Synthetic service-operations preview showing structured triage, evidence review and
            human-owned routing decisions for L1 resolution, escalation or field dispatch.
          </p>
        </div>
        <div className="hero-badge">
          <span>Recruiter preview</span>
          <strong>React | TypeScript | Vite</strong>
        </div>
      </header>

      <section className="disclaimer" aria-label="Demo disclaimer">
        <strong>Safety boundary:</strong> this is not a Scheidt &amp; Bachmann product, internal
        system or production integration. All scenarios and data are fictional and synthetic.
      </section>

      <section className="kpi-grid" aria-label="Preview metrics">
        <article>
          <span>Open synthetic cases</span>
          <strong>4</strong>
        </article>
        <article>
          <span>Decision routes</span>
          <strong>3</strong>
        </article>
        <article>
          <span>Evidence coverage</span>
          <strong>100%</strong>
        </article>
        <article>
          <span>Unverified actions</span>
          <strong>0</strong>
        </article>
      </section>

      <section className="workspace">
        <aside className="case-list" aria-label="Synthetic service cases">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Queue</p>
              <h2>Service cases</h2>
            </div>
            <span className="queue-count">{scenarios.length}</span>
          </div>

          <div className="case-stack">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                type="button"
                className={scenario.id === selected.id ? 'case-card case-card-active' : 'case-card'}
                onClick={() => {
                  setSelectedId(scenario.id);
                  setDecision(null);
                }}
              >
                <div className="case-card-top">
                  <span className="case-id">{scenario.id}</span>
                  <span className={severityClass(scenario.severity)}>{scenario.severity}</span>
                </div>
                <strong>{scenario.title}</strong>
                <span>{scenario.location}</span>
                <small>
                  {scenario.source} | {scenario.signal}
                </small>
              </button>
            ))}
          </div>
        </aside>

        <section className="case-detail" aria-live="polite">
          <div className="section-heading detail-heading">
            <div>
              <p className="eyebrow">Selected case</p>
              <h2>{selected.title}</h2>
            </div>
            <span className={severityClass(selected.severity)}>{selected.severity}</span>
          </div>

          <div className="meta-row">
            <span>{selected.id}</span>
            <span>{selected.location}</span>
            <span>{selected.source}</span>
            <span>{selected.signal}</span>
          </div>

          <p className="summary">{selected.summary}</p>

          <div className="detail-grid">
            <article className="panel">
              <p className="eyebrow">Evidence check</p>
              <h3>What is known</h3>
              <ul className="evidence-list">
                {selected.evidence.map((item) => (
                  <li key={item}>
                    <span aria-hidden="true">âś“</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="panel route-panel">
              <p className="eyebrow">Resolution gate</p>
              <h3>{selected.recommendedRoute}</h3>
              <p>{selected.rationale}</p>
              <div className="route-actions" role="group" aria-label="Choose routing decision">
                {(['L1 resolve', 'L2/L3 escalate', 'Field dispatch'] as const).map((route) => (
                  <button
                    key={route}
                    type="button"
                    className={
                      decision === route ? 'route-button route-button-selected' : 'route-button'
                    }
                    onClick={() => {
                      setDecision(route);
                    }}
                  >
                    {route}
                  </button>
                ))}
              </div>
            </article>
          </div>

          <div className="decision-strip">
            <div>
              <p className="eyebrow">Human decision</p>
              <strong>{decision ?? 'No route selected yet'}</strong>
            </div>
            <span>
              Recommended: <strong>{selected.recommendedRoute}</strong>
            </span>
          </div>
        </section>
      </section>

      <section className="proof-grid">
        <article>
          <p className="eyebrow">What this demonstrates</p>
          <h2>Service-operations reasoning</h2>
          <p>
            Structured intake, evidence correlation, incident/request triage, reversible decision
            making and explicit handoff boundaries.
          </p>
        </article>
        <article>
          <p className="eyebrow">Candidate signal</p>
          <h2>Technical support mindset</h2>
          <p>
            React/TypeScript implementation, clear state handling, accessibility-aware UI and a
            deterministic synthetic workflow instead of unsupported automation claims.
          </p>
        </article>
      </section>

      <footer>
        <span>DuĹˇan Cabala | Candidate project | 2026</span>
        <a href="https://github.com/liafix/serviceops-resolution-gate">View source on GitHub</a>
      </footer>
    </main>
  );
}
