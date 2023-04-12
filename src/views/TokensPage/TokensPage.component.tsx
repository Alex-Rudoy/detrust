import { useState } from 'react';
import { TabBar } from '@/components/TabBar';
import { Layout } from '@/ui/Layout';
import { TokensPageTabs } from './TokensPage.constants';
import { VisualizationsTabComponent } from './VisualizationsTab/VisualizationsTab.component';
import styles from './TokensPage.module.scss';

export const TokensPageComponent = () => {
  const [selectedTab, setSelectedTab] = useState('Visualizations');

  return (
    <Layout activeMenuLink="Tokens">
      <TabBar
        options={TokensPageTabs}
        selectedTab={selectedTab}
        onTabClick={(value) => setSelectedTab(value)}
      />
      {(() => {
        switch (selectedTab) {
          case 'Visualizations':
            return <VisualizationsTabComponent />;
          case 'Connections':
            return;
          case 'List':
            return;

          default:
            return null;
        }
      })()}
    </Layout>
  );
};

TokensPageComponent.displayName = 'TokensPage';
