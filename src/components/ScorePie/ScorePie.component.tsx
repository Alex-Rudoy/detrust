import React from 'react';
import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';
import { ScorePieProps } from './ScorePie.types';

import styles from './ScorePie.module.scss';

export const ScorePieComponent: React.FC<ScorePieProps> = ({
  percent,
  absoluteData,
  ...props
}) => {
  const percentNumber = Math.round(percent * 100);
  const style = {
    '--c': `hsl(${percentNumber * 1.3 - 20}, 70%, 50%)`,
    '--p': percentNumber,
  } as React.CSSProperties;

  return (
    <div className={styles.pie} style={style} {...props}>
      <Text size={TextSizeEnum.S12} fontWeight={FontWeightEnum.FW500}>
        {percentNumber}
      </Text>
      {absoluteData ? (
        <div className={styles.tooltip}>{Math.round(absoluteData)}</div>
      ) : null}
    </div>
  );
};

ScorePieComponent.displayName = 'ScorePie';
