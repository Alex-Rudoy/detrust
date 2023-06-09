import { useState } from 'react';
import {
  Area,
  CartesianGrid,
  AreaChart,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart';

import { Button, ButtonVariantEnum } from '@components/Button';
import { Loader } from '@components/Loader';
import { IconsEnum } from '@components/SvgIcon';
import { PriceChartCustomDot } from './PriceChartCustomDot';
import { PriceChartTooltip } from './PriceChartTooltip';

import { primary_400 } from '@utils/colors';
import { ONE_DAY, TEN_DAYS } from '@utils/constants';
import { hasValue } from '@utils/hasValue';
import { useTokenPriceSelector } from '@store/tokens/tokenPrice/useTokenPriceSelector';

import { requestStatusEnum } from '@typings/requestStatus';

import styles from './TokenPriceChart.module.scss';

export const TokenPriceChartComponent = () => {
  const { tokenPrice, status } = useTokenPriceSelector();
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
      {status !== requestStatusEnum.SUCCESS ? (
        <div className={styles.loadingContainer}>
          <Loader />
        </div>
      ) : (
        <>
          <ResponsiveContainer height={500}>
            <AreaChart
              data={tokenPrice}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="10%"
                    stopColor={primary_400}
                    stopOpacity={0.3}
                  />
                  <stop offset="90%" stopColor={primary_400} stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="price"
                stroke={primary_400}
                activeDot={false}
                dot={PriceChartCustomDot}
                fillOpacity={1}
                fill="url(#colorUv)"
              />
              <Tooltip content={PriceChartTooltip} />
              {selectionStart.x && selectionEnd.x ? (
                <ReferenceArea
                  x1={selectionStart.x}
                  x2={selectionEnd.x}
                  strokeOpacity={0.3}
                />
              ) : null}
            </AreaChart>
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
        </>
      )}
    </div>
  );
};

TokenPriceChartComponent.displayName = 'TokenPriceChart';
