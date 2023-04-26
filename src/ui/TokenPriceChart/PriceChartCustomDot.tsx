import { ReactElement } from 'react';

import { TokenPriceChartItemType } from '@store/tokens/tokenPrice/tokenPrice.types';

export const PriceChartCustomDot = ({
  cx,
  cy,
  payload,
  key,
  width,
  height,
}: {
  cx: number;
  cy: number;
  stroke: string;
  key: string;
  width: number;
  height: number;
  payload: TokenPriceChartItemType;
}): ReactElement<SVGElement> => {
  if (!payload.color) return <svg key={key} />;

  return (
    <>
      <circle
        fill={payload.color}
        stroke={payload.stroke}
        strokeWidth="2"
        width={width}
        height={height}
        cx={cx}
        cy={cy}
        r="8"
        className="recharts-dot recharts-line-dot"
      />
    </>
  );
};
