import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';
import { Layout } from '@ui/Layout';
import styles from './NotFoundPage.module.scss';

export const NotFoundPageComponent = () => {
  return (
    <Layout>
      <div className={styles.notFoundPage}>
        <Text size={TextSizeEnum.S48} fontWeight={FontWeightEnum.FW700}>
          404
        </Text>
        <Text size={TextSizeEnum.S24} fontWeight={FontWeightEnum.FW500}>
          Page not found
        </Text>
      </div>
    </Layout>
  );
};

NotFoundPageComponent.displayName = 'NotFoundPage';
