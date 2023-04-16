import { useState } from 'react';
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
import { IconsEnum } from '@components/SvgIcon';
import { routes } from '@views/routes';
import { ScatterChartTooltip } from './ScatterChartTooltip/ScatterChartTooltip';
import { hasValue } from '@utils/hasValue';
import { TokensListPageProps } from '../TokensListPage.types';

import styles from './VisualizationsTab.module.scss';

export const VisualizationsTabComponent = ({
  tokens,
  chartBoundaries: { minX, maxX, minY, maxY },
}: TokensListPageProps) => {
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

  const handleMouseDown: CategoricalChartFunc = (nextState, e) => {
    if (e.target?.classList?.contains('recharts-symbols') && e.target?.id) {
      router.push(routes.tokenPage(e.target.id));
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

  return (
    <div className={styles.visualizationTab}>
      <ResponsiveContainer height={600}>
        <ScatterChart
          margin={{
            top: 24,
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            domain={domainX}
            allowDataOverflow={true}
            tickFormatter={(value) => Math.round(value).toString()}
            tickCount={10}
          />
          <YAxis
            dataKey="y"
            type="number"
            domain={domainY}
            tickFormatter={(value) => Math.round(value).toString()}
            allowDataOverflow={true}
            tickCount={5}
          />
          <ZAxis
            dataKey="general_score"
            type="number"
            range={[0, 200]}
            name="general_score"
          />
          <Tooltip cursor={false} content={ScatterChartTooltip} />
          <Scatter data={tokens} fill="#5c98f1" />
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
      {domainX[0] !== minX ||
      domainX[1] !== maxX ||
      domainY[0] !== minY ||
      domainY[1] !== maxY ? (
        <Button
          onClick={resetChart}
          variant={ButtonVariantEnum.primary}
          text="Reset chart"
          icon={IconsEnum.refresh}
        />
      ) : null}
    </div>
  );
};

VisualizationsTabComponent.displayName = 'VisualizationsTab';
