import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { ContentType } from 'recharts/types/component/Tooltip';

import { BadgeDelta } from '@components/BadgeDelta';
import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';

import { postfixNumber } from '@utils/postfixNumber';
import { GroupTokenType } from '@store/degens/groupTokens/groupTokens.types';

import styles from './PieChartTooltip.module.scss';

const round = (n: number) => Math.round(n * 100);

export const PieChartTooltip: ContentType<ValueType, NameType> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as GroupTokenType;
    return (
      <div className={styles.tooltip}>
        <Text
          size={TextSizeEnum.S16}
          fontWeight={FontWeightEnum.FW700}
          className={styles.heading}
        >
          {data.project_name}
        </Text>
        <div className={styles.grid}>
          <div>
            <Text size={TextSizeEnum.S12}>
              Price: {postfixNumber(data.price)}
            </Text>
          </div>
          <div>
            <Text size={TextSizeEnum.S12}>1d</Text>
            <BadgeDelta value={round(data.price_1d_diff)} percent />
          </div>
          <div>
            <Text size={TextSizeEnum.S12}>7d</Text>
            <BadgeDelta value={round(data.price_7d_diff)} percent />
          </div>
          <div>
            <Text size={TextSizeEnum.S12}>
              Volume: {postfixNumber(data.volume)}
            </Text>
          </div>
          <div>
            <Text size={TextSizeEnum.S12}>1d</Text>
            <BadgeDelta value={round(data.volume_1d_diff)} percent />
          </div>
          <div>
            <Text size={TextSizeEnum.S12}>7d</Text>
            <BadgeDelta value={round(data.volume_7d_diff)} percent />
          </div>
          <div>
            <Text size={TextSizeEnum.S12}>
              Views: {postfixNumber(data.impression_count)}
            </Text>
          </div>
          <div>
            <Text size={TextSizeEnum.S12}>1d</Text>
            <BadgeDelta value={round(data.impression_1d_diff)} percent />
          </div>
          <div>
            <Text size={TextSizeEnum.S12}>7d</Text>
            <BadgeDelta value={round(data.impression_7d_diff)} percent />
          </div>
          <div>
            <Text size={TextSizeEnum.S12}>
              Mentions: {postfixNumber(data.mention_count)}
            </Text>
          </div>
          <div>
            <Text size={TextSizeEnum.S12}>1d</Text>
            <BadgeDelta value={round(data.mention_count_1d_diff)} percent />
          </div>
          <div>
            <Text size={TextSizeEnum.S12}>7d</Text>
            <BadgeDelta value={round(data.mention_count_7d_diff)} percent />
          </div>
        </div>
      </div>
    );
  }
  return null;
};
