import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';
import { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart';

import { Button, ButtonVariantEnum } from '@components/Button';
import { InfoHover } from '@components/InfoHover';
import { IconsEnum } from '@components/SvgIcon';
import { Text, TextSizeEnum } from '@components/Text';
import { routes } from '@views/routes';
import { ScatterChartTooltip } from './ScatterChartTooltip/ScatterChartTooltip';

import { hasValue } from '@utils/hasValue';
import { useTokensListSelector } from '@store/tokens/tokensList/useTokensListSelector';

import { requestStatusEnum } from '@typings/requestStatus';

import styles from './VisualizationsTab.module.scss';

export const VisualizationsTabComponent = () => {
  const {
    tokensList,
    tokenBoundaries: { minX, maxX, minY, maxY },
    status,
  } = useTokensListSelector();

  const router = useRouter();
  const [selectionStart, setSelectionStart] = useState<{
    x?: number;
    y?: number;
  }>({});
  const [selectionEnd, setSelectionEnd] = useState<{
    x?: number;
    y?: number;
  }>({});
  const [domainX, setDomainX] = useState<number[]>([minX, maxX]);
  const [domainY, setDomainY] = useState<number[]>([minY, maxY]);
  const [canvasHeight, setCanvasHeight] = useState<number>(800);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCanvasHeight(window.innerHeight - 329);
  });

  const symbols = useMemo(
    () =>
      tokensList.reduce(
        (obj, token) => ({ ...obj, [token.id]: token.symbol }),
        {},
      ),
    [tokensList],
  );

  const handleMouseDown: CategoricalChartFunc = (nextState, e) => {
    if (e.target?.classList?.contains('recharts-symbols') && e.target?.id) {
      router.push(
        routes.tokenPage(symbols[e.target.id as keyof typeof symbols]),
      );
      return;
    }
    if (!nextState?.xValue || !nextState?.yValue) return;
    setSelectionStart({ x: nextState.xValue, y: nextState.yValue });
    setSelectionEnd({ x: nextState.xValue, y: nextState.yValue });
  };

  const handleMouseMove: CategoricalChartFunc = (nextState) => {
    if (
      (selectionStart.x || selectionStart.y) &&
      nextState?.xValue &&
      nextState?.yValue
    ) {
      setSelectionEnd({ x: nextState?.xValue, y: nextState?.yValue });
    }
  };

  const handleMouseUp = () => {
    if (
      !hasValue(selectionStart.x) ||
      !hasValue(selectionEnd.x) ||
      !hasValue(selectionStart.y) ||
      !hasValue(selectionEnd.y)
    )
      return;
    setSelectionStart({});
    setSelectionEnd({});
    if (Math.abs(selectionStart.x - selectionEnd.x) < 10) return;
    if (Math.abs(selectionStart.y - selectionEnd.y) < 1) return;
    setDomainX([
      Math.min(selectionStart.x, selectionEnd.x),
      Math.max(selectionStart.x, selectionEnd.x),
    ]);
    setDomainY([
      Math.min(selectionStart.y, selectionEnd.y),
      Math.max(selectionStart.y, selectionEnd.y),
    ]);
  };

  const resetChart = () => {
    setDomainX([minX, maxX]);
    setDomainY([minY, maxY]);
  };

  if (status !== requestStatusEnum.SUCCESS) return null;

  return (
    <div className={styles.visualizationTab}>
      <div className={styles.heading}>
        <Text size={TextSizeEnum.S14}>
          This graph shows how similar projects are based on their communities.
          The closer two projects are, the more similar their community is.
        </Text>
        <InfoHover id="scatter_chart_help">
          <Text size={TextSizeEnum.S12}>
            Draw a rectangle with mouse to zoom in
          </Text>
          <Text size={TextSizeEnum.S12}>Click on node to go to token page</Text>
        </InfoHover>
      </div>

      <ResponsiveContainer height={canvasHeight}>
        <ScatterChart
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          margin={{ left: -59 }}
        >
          {/* <CartesianGrid stroke="white" /> */}
          <XAxis
            dataKey="x"
            type="number"
            domain={domainX}
            allowDataOverflow={true}
            tickFormatter={(value) => Math.round(value).toString()}
            tick={false}
            strokeWidth={0}
          />
          <YAxis
            dataKey="y"
            type="number"
            domain={domainY}
            tickFormatter={(value) => Math.round(value).toString()}
            allowDataOverflow={true}
            tick={false}
            strokeWidth={0}
          />
          <ZAxis
            dataKey="general_score"
            type="number"
            range={[0, 200]}
            name="general_score"
          />
          <Tooltip cursor={false} content={ScatterChartTooltip} />
          <Scatter data={tokensList} fill="#5c98f1" />
          {selectionStart.x && selectionEnd.x ? (
            <ReferenceArea
              x1={selectionStart.x}
              y1={selectionStart.y}
              x2={selectionEnd.x}
              y2={selectionEnd.y}
              strokeOpacity={0.3}
            />
          ) : null}
        </ScatterChart>
      </ResponsiveContainer>

      <Button
        onClick={resetChart}
        variant={ButtonVariantEnum.primary}
        text="Reset chart"
        icon={IconsEnum.refresh}
      />
    </div>
  );
};

VisualizationsTabComponent.displayName = 'VisualizationsTab';
