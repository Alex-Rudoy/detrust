import { useState } from 'react';
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

import { ONE_DAY } from '@utils/constants';
import { hasValue } from '@utils/hasValue';

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
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
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
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            activeDot={false}
            dot={false}
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
