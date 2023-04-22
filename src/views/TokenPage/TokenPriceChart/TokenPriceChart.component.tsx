import { ReactElement, useCallback, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart';

import { Button, ButtonVariantEnum } from '@components/Button';
import { InfoHover } from '@components/InfoHover';
import { IconsEnum } from '@components/SvgIcon';
import { Text, TextSizeEnum } from '@components/Text';

import { primary_400 } from '@utils/colors';
import { ONE_DAY, TEN_DAYS } from '@utils/constants';
import { hasValue } from '@utils/hasValue';

import { TokenPriceChartItemType } from '@typings/tokens';

import { TokenPriceChartProps } from './TokenPriceChart.types';

import styles from './TokenPriceChart.module.scss';

export const TokenPriceChartComponent = ({
  tokenPrice,
}: TokenPriceChartProps) => {
  const [selectionStart, setSelectionStart] = useState<{
    x?: number;
  }>({});
  const [selectionEnd, setSelectionEnd] = useState<{
    x?: number;
  }>({});
  const [domainX, setDomainX] = useState<
    [number | 'dataMin', number | 'dataMax']
  >(['dataMin', 'dataMax']);

  const handleMouseDown: CategoricalChartFunc = (nextState) => {
    if (!nextState?.activeLabel) return;
    setSelectionStart({ x: +nextState?.activeLabel });
    setSelectionEnd({ x: +nextState?.activeLabel });
  };

  const handleMouseMove: CategoricalChartFunc = (nextState) => {
    if (selectionStart.x && nextState?.activeLabel) {
      setSelectionEnd({ x: +nextState?.activeLabel });
    }
  };

  const handleMouseUp = () => {
    if (!hasValue(selectionStart.x) || !hasValue(selectionEnd.x)) return;
    setSelectionStart({});
    setSelectionEnd({});

    if (Math.abs(selectionStart.x - selectionEnd.x) < ONE_DAY) return;

    setDomainX([
      Math.min(selectionStart.x, selectionEnd.x),
      Math.max(selectionStart.x, selectionEnd.x),
    ]);
  };

  const resetChart = () => {
    setDomainX(['dataMin', 'dataMax']);
  };

  const CustomDot = useCallback(
    ({
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
      );
    },
    [],
  );

  return (
    <div className={styles.tokenPriceChart}>
      <div className={styles.heading}>
        <Text size={TextSizeEnum.S24}>Mentions</Text>
        <InfoHover id="price_chart_help" className={styles.infoIcon}>
          <Text size={TextSizeEnum.S12} className={styles.info}>
            Draw a rectangle with mouse to zoom in
          </Text>
        </InfoHover>
      </div>
      <ResponsiveContainer height={500}>
        <LineChart
          data={tokenPrice}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            type="number"
            domain={domainX}
            tick={{ fontSize: 12 }}
            tickCount={10}
            tickFormatter={(value) =>
              domainX[1] !== 'dataMax' &&
              domainX[0] !== 'dataMin' &&
              domainX[1] - domainX[0] < TEN_DAYS
                ? new Date(value).toLocaleDateString() +
                  ' ' +
                  new Date(value).toLocaleTimeString()
                : new Date(value).toLocaleDateString()
            }
            allowDataOverflow
          />
          <YAxis
            dataKey="price"
            type="number"
            domain={['dataMin', 'dataMax']}
            tick={{ fontSize: 12 }}
            tickCount={5}
            tickFormatter={(value) => value.toString().slice(0, 5)}
            allowDataOverflow
            padding={{ top: 10, bottom: 10 }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={primary_400}
            activeDot={false}
            dot={CustomDot}
          />
          <Tooltip content={() => null} />
          {selectionStart.x && selectionEnd.x ? (
            <ReferenceArea
              x1={selectionStart.x}
              x2={selectionEnd.x}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
      <div className={styles.controls}>
        {domainX[0] !== 'dataMin' || domainX[1] !== 'dataMax' ? (
          <Button
            onClick={resetChart}
            variant={ButtonVariantEnum.primary}
            text="Reset chart"
            icon={IconsEnum.refresh}
          />
        ) : null}
      </div>
    </div>
  );
};

TokenPriceChartComponent.displayName = 'TokenPriceChart';
