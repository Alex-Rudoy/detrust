import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { InfoHover } from '@components/InfoHover';
import { Text, TextSizeEnum } from '@components/Text';
import { Dropdown } from '@ui/Dropdown';
import { Layout } from '@ui/Layout';
import { TokenPriceChart } from '@ui/TokenPriceChart';
import { DegenInfoSection } from './DegenInfoSection';
import { MentionsTableSection } from './MentionsTableSection';

import { useDegenTokensSelector } from '@store/degens/degenTokens/useDegenTokensSelector';
import { useTokensActions } from '@store/tokens/useTokensActions';

import styles from './DegenPage.module.scss';

export const DegenPageComponent = () => {
  const router = useRouter();
  const username = router.query.username as string;
  const { degenTokens } = useDegenTokensSelector();
  const { fetchTokenPriceForDegenAction } = useTokensActions();
  const [selectedToken, setSelectedToken] = useState(degenTokens[0]?.mention);

  useEffect(() => {
    fetchTokenPriceForDegenAction({
      username,
      symbol: degenTokens[0].mention,
    });
  }, []);

  const handleTokenChange = (value: string) => {
    setSelectedToken(value);
    fetchTokenPriceForDegenAction({
      username,
      symbol: value,
    });
  };

  return (
    <Layout
      breadcrumbs={['Degens', username]}
      title={`Degens | ${username}`}
      description={`Comprehensive info about ${username}`}
    >
      <DegenInfoSection />
      {degenTokens.length > 0 && (
        <>
          <div className={styles.heading}>
            <Text size={TextSizeEnum.S24}>Mentions</Text>
            <InfoHover id="price_chart_help" className={styles.infoIcon}>
              <Text size={TextSizeEnum.S12}>
                Draw a rectangle with mouse to zoom in
              </Text>
            </InfoHover>
            <Dropdown
              options={degenTokens.map((token) => ({
                value: token.mention,
                label: token.mention,
              }))}
              value={selectedToken}
              setValue={handleTokenChange}
              width={150}
              showSearch
            />
          </div>
          <TokenPriceChart />
          <MentionsTableSection />
        </>
      )}
    </Layout>
  );
};

DegenPageComponent.displayName = 'DegenPage';
