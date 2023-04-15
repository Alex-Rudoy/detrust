import { useRouter } from 'next/router';
import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

import { routes } from '@views/routes';
import { ScatterChartTooltip } from './ScatterChartTooltip/ScatterChartTooltip';
import { TokensListPageProps } from '../TokensListPage.types';

export const VisualizationsTabComponent = ({
  tokens,
  aggregatedData: { minX, maxX, minY, maxY },
}: TokensListPageProps) => {
  const router = useRouter();
  const firstTickX = Math.floor(minX / 200) * 200;
  const xTicks = new Array(Math.ceil((maxX - minX) / 200) + 1)
    .fill('')
    .map((_, i) => i * 200 + firstTickX);

  const firstTickY = Math.floor(minY / 20) * 20;
  const yTicks = new Array(Math.ceil((maxY - minY) / 20) + 1)
    .fill('')
    .map((_, i) => i * 20 + firstTickY);

  return (
    <div>
      <ResponsiveContainer height={600}>
        <ScatterChart
          margin={{
            top: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x"
            type="number"
            domain={['dataMin', 'dataMax']}
            padding={{ left: 20, right: 20 }}
            allowDataOverflow={true}
            tickFormatter={(value) => Math.round(value).toString()}
            ticks={xTicks}
          />
          <YAxis
            dataKey="y"
            type="number"
            domain={['dataMin', 'dataMax']}
            tickFormatter={(value) => Math.round(value).toString()}
            allowDataOverflow={true}
            padding={{ top: 20, bottom: 20 }}
            ticks={yTicks}
          />
          <ZAxis
            dataKey="general_score"
            type="number"
            range={[0, 200]}
            name="general_score"
          />
          <Tooltip cursor={false} content={ScatterChartTooltip} />
          <Scatter
            data={tokens}
            fill="#8884d8"
            onClick={(item) => router.push(routes.tokenPage(item.id))}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

VisualizationsTabComponent.displayName = 'VisualizationsTab';
