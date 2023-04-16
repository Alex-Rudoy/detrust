import { Badge, BadgeColorsEnum } from '@components/Badge';
import { Button, ButtonVariantEnum } from '@components/Button';
import { CustomTooltip } from '@components/CustomTooltip';
import { ScorePie } from '@components/ScorePie';
import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';
import { ChartWithTokenScores } from './ChartWithTokenScores';
import { TokenInfoSectionProps } from './TokenInfoSection.types';

import styles from './TokenInfoSection.module.scss';

export const TokenInfoSectionComponent = ({ token }: TokenInfoSectionProps) => {
  return (
    <div className={styles.infoSection}>
      <div className={styles.description}>
        <div className={styles.titleBlock}>
          <Text size={TextSizeEnum.S24} fontWeight={FontWeightEnum.FW500}>
            General Score
          </Text>
          <ScorePie
            percent={token.general_score}
            width={60}
            fontSize={TextSizeEnum.S22}
          />
          <Button
            variant={ButtonVariantEnum.primary}
            text="Customize"
            size="sm"
            disabled
            data-tooltip-id={'customize_button'}
            data-tooltip-content={'Coming soon'}
          />
          <CustomTooltip data-tooltip-id={'customize_button'} />
        </div>
        <Text size={TextSizeEnum.S14} fontWeight={FontWeightEnum.FW400}>
          {token.description}
        </Text>
      </div>
      <div className={styles.chartContainer}>
        <ChartWithTokenScores token={token} />
      </div>
    </div>
  );
};

TokenInfoSectionComponent.displayName = 'TokenInfoSection';
