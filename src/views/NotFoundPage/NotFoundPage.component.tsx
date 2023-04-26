import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';
import { Layout } from '@ui/Layout';

import styles from './NotFoundPage.module.scss';

export const NotFoundPageComponent = () => {
  return (
    <Layout title={'404'} description={'Page not found'}>
      <div className={styles.notFoundPage}>
        <Text size={TextSizeEnum.S48} fontWeight={FontWeightEnum.FW700}>
          404
        </Text>
        <Text size={TextSizeEnum.S24}>Page not found</Text>
      </div>
    </Layout>
  );
};

NotFoundPageComponent.displayName = 'NotFoundPage';
