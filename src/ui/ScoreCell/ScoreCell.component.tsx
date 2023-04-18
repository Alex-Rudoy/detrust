import { ScorePie } from '@components/ScorePie';
import { ScoreCellProps } from './ScoreCell.types';

import styles from './ScoreCell.module.scss';

export const ScoreCellComponent = ({
  normalizedData,
  absoluteData,
}: ScoreCellProps) => {
  return (
    <div className={styles.scoreCell}>
      <ScorePie percent={normalizedData} absoluteData={absoluteData} />
    </div>
  );
};

ScoreCellComponent.displayName = 'ScoreCell';
