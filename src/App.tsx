import { FOUNDATION_NOTICE, FOUNDATION_STATUS } from './foundation';

export function App() {
  return (
    <main>
      <h1>ServiceOps Resolution Gate</h1>
      <p>{FOUNDATION_STATUS}</p>
      <p>{FOUNDATION_NOTICE}</p>
      <p>Business logic intentionally starts after P0 review.</p>
    </main>
  );
}
