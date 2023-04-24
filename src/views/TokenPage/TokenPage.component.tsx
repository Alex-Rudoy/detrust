import { useEffect } from 'react';

import { Layout } from '@ui/Layout';
import { TokenInfoSection } from './TokenInfoSection';
import { TokenPriceChart } from './TokenPriceChart';
import { DegensTableSection } from '../../ui/DegensTableSection';

import { useDegensActions } from '@store/degens/useDegensActions';
import { useTokenSelector } from '@store/tokens/token/useTokenSelector';
import { useTokensActions } from '@store/tokens/useTokensActions';

export const TokenPageComponent = () => {
  const { token } = useTokenSelector();

  const { fetchTokenPriceAction } = useTokensActions();
  const { fetchDegensListForTokenAction } = useDegensActions();

  useEffect(() => {
    if (!token.symbol) return;
    fetchTokenPriceAction({ symbol: token.symbol });
    fetchDegensListForTokenAction({ symbol: token.symbol });
  }, [token.symbol]);

  return (
    <Layout
      activeMenuLink="Tokens"
      breadcrumbs={['Tokens', token.project_name || '...']}
    >
      <TokenInfoSection />
      <TokenPriceChart />
      <DegensTableSection />
    </Layout>
  );
};

TokenPageComponent.displayName = 'TokenPage';
