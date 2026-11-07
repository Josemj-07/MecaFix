import * as React from 'react';
import { useSearchParams } from 'react-router';

import { type BillingCycle } from '../utils/pricing';

// The billing cycle lives in the URL (?ciclo=anual) so a quote can be shared.
export const useBillingCycle = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const cycle: BillingCycle =
    searchParams.get('ciclo') === 'anual' ? 'anual' : 'mensual';

  const setCycle = React.useCallback(
    (next: BillingCycle) => {
      setSearchParams(
        (params) => {
          if (next === 'anual') params.set('ciclo', 'anual');
          else params.delete('ciclo');
          return params;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    [setSearchParams],
  );

  return { cycle, setCycle };
};
