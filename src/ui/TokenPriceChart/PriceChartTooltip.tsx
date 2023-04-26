import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';

import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';

import styles from './TokenPriceChart.module.scss';

export const PriceChartTooltip: ContentType<ValueType, NameType> = (props) => {
  return (
    props.payload?.[0]?.payload?.text && (
      <div className={styles.tooltipContainer}>
        <Text
          size={TextSizeEnum.S16}
          fontWeight={FontWeightEnum.FW700}
          className={styles.tooltipHeading}
        >
          {props.payload[0].payload.author}
        </Text>
        <Text size={TextSizeEnum.S12}>{props.payload[0].payload.text}</Text>
      </div>
    )
  );
};
