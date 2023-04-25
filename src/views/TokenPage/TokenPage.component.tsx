import { useEffect } from 'react';

import { InfoHover } from '@components/InfoHover';
import { Text, TextSizeEnum } from '@components/Text';
import { Layout } from '@ui/Layout';
import { TokenInfoSection } from './TokenInfoSection';
import { DegensTableSection } from '../../ui/DegensTableSection';
import { TokenPriceChart } from '../../ui/TokenPriceChart';

import { useDegensActions } from '@store/degens/useDegensActions';
import { useTokenSelector } from '@store/tokens/token/useTokenSelector';
import { useTokensActions } from '@store/tokens/useTokensActions';

import styles from './TokenPage.module.scss';

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
      <div className={styles.heading}>
        <Text size={TextSizeEnum.S24}>Mentions</Text>
        <InfoHover id="price_chart_help" className={styles.infoIcon}>
          <Text size={TextSizeEnum.S12}>
            Draw a rectangle with mouse to zoom in
          </Text>
        </InfoHover>
      </div>
      <TokenPriceChart />
      <DegensTableSection />
    </Layout>
  );
};

TokenPageComponent.displayName = 'TokenPage';
