import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';

import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';
import styles from './ScatterChartTooltip.module.scss';

export const ScatterChartTooltip: ContentType<ValueType, NameType> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <Text size={TextSizeEnum.S14} fontWeight={FontWeightEnum.FW500}>
          {payload[0].payload.project_name}
        </Text>
      </div>
    );
  }
  return null;
};
