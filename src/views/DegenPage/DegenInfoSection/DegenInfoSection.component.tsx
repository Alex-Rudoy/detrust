import { Badge } from '@components/Badge';
import { CustomTooltip } from '@components/CustomTooltip';
import { ScorePie } from '@components/ScorePie';
import { IconsEnum, SvgIcon } from '@components/SvgIcon';
import { Text, TextSizeEnum } from '@components/Text';
import { ChartWithDegenScores } from './ChartWithDegenScores';

import { useDegenInfoSelector } from '@store/degens/degenInfo/useDegenInfoSelector';
import { useDegenTagsSelector } from '@store/degens/degenTags/useDegenTagsSelector';

import styles from './DegenInfoSection.module.scss';

export const DegenInfoSectionComponent = () => {
  const { degenInfo } = useDegenInfoSelector();
  const { degenTags } = useDegenTagsSelector();

  return (
    <div className={styles.infoSection}>
      <div className={styles.description}>
        <div className={styles.titleBlock}>
          <Text size={TextSizeEnum.S24}>General Score</Text>
          <ScorePie
            percent={degenInfo.general_score}
            width={60}
            fontSize={TextSizeEnum.S22}
          />
          <SvgIcon
            src={IconsEnum.settings}
            size={20}
            data-tooltip-id={'customize_button'}
            data-tooltip-content={'Coming soon'}
          />
          <CustomTooltip data-tooltip-id={'customize_button'} />
        </div>
        <div className={styles.tagContainer}>
          {degenTags.map((tag) => (
            <Badge
              key={tag.category_id}
              text={tag.category}
              color={tag.category_color}
            />
          ))}
        </div>
      </div>
      <div className={styles.chartContainer}>
        <ChartWithDegenScores />
      </div>
    </div>
  );
};

DegenInfoSectionComponent.displayName = 'DegenInfoSection';
