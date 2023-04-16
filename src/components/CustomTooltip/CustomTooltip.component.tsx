import { Tooltip } from 'react-tooltip';

import { CustomTooltipProps } from './CustomTooltip.types';

import styles from './CustomTooltip.module.scss';

export const CustomTooltipComponent = ({
  'data-tooltip-id': id,
}: CustomTooltipProps) => {
  return (
    <Tooltip id={id} place={'top'} className={styles.customTooltip} float />
  );
};

CustomTooltipComponent.displayName = 'CustomTooltip';
