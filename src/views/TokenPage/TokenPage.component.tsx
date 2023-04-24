import { useEffect } from 'react';

import { Loader } from '@components/Loader';
import { Layout } from '@ui/Layout';
import { TokenInfoSection } from './TokenInfoSection';
import { TokenPriceChart } from './TokenPriceChart';
import { DegensTableSection } from '../../ui/DegensTableSection';

import { useDegensActions } from '@store/degens/useDegensActions';
import { useTokenSelector } from '@store/tokens/token/useTokenSelector';
import { useTokenPriceSelector } from '@store/tokens/tokenPrice/useTokenPriceSelector';
import { useTokensActions } from '@store/tokens/useTokensActions';

import { requestStatusEnum } from '@typings/requestStatus';

import styles from './TokenPage.module.scss';

export const TokenPageComponent = () => {
  const { token } = useTokenSelector();
  const { status } = useTokenPriceSelector();

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
      {status === requestStatusEnum.SUCCESS ? (
        <>
          <TokenPriceChart />
          <DegensTableSection />
        </>
      ) : (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      )}
    </Layout>
  );
};

TokenPageComponent.displayName = 'TokenPage';
