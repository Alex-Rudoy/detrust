import { useState } from 'react';
import { TabBar } from '@components/TabBar';
import { Layout } from '@ui/Layout';
import { TokenPageTabComponents, TokensPageTabs } from './TokensPage.constants';
import { TokensPageProps } from './TokensPage.types';

export const TokensPageComponent = (props: TokensPageProps) => {
  const [selectedTab, setSelectedTab] = useState('Visualizations');

  const TabComponent = TokenPageTabComponents[selectedTab];

  return (
    <Layout activeMenuLink="Tokens" breadcrumbs={['Tokens', 'BTC']}>
      <TabBar
        options={TokensPageTabs}
        selectedTab={selectedTab}
        onTabClick={(value) => setSelectedTab(value)}
      />
      <TabComponent {...props} />
    </Layout>
  );
};

TokensPageComponent.displayName = 'TokensPage';
