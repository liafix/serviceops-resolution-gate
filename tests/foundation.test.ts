import { describe, expect, it } from 'vitest';
import { FOUNDATION_NOTICE, FOUNDATION_STATUS } from '../src/foundation';

describe('P0 foundation', () => {
  it('remains explicitly pre-business-logic', () => {
    expect(FOUNDATION_STATUS).toBe('P0_FOUNDATION_ONLY');
  });

  it('preserves the synthetic safety boundary', () => {
    expect(FOUNDATION_NOTICE).toContain('Independent synthetic candidate demonstrator');
    expect(FOUNDATION_NOTICE).toContain('No company-internal systems');
  });
});
