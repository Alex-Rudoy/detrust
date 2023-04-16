import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';

import {
  generateChartWithTokenScoresData,
  tickLabels,
} from './ChartWithTokenScores.constants';
import { TokenShortType } from '@typings/tokens';
import { ChartWithTokenScoresProps } from './ChartWithTokenScores.types';

export const ChartWithTokenScoresComponent = ({
  token,
}: ChartWithTokenScoresProps) => {
  return (
    <ResponsiveContainer height={500}>
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={generateChartWithTokenScoresData(token)}
      >
        <PolarGrid />
        <PolarAngleAxis
          dataKey="quality"
          tickLine={false}
          tick={({ payload, x, y, textAnchor, stroke, radius }) => {
            const label = payload.value as keyof typeof tickLabels;
            return (
              <g className="recharts-layer recharts-polar-angle-axis-tick">
                <text
                  radius={radius}
                  stroke={stroke}
                  x={x}
                  y={y}
                  className="recharts-text recharts-polar-angle-axis-tick-value"
                  textAnchor={textAnchor}
                  fontSize={14}
                >
                  <tspan x={x} dy={tickLabels[label].dy} fill="#dbe6f8">
                    {tickLabels[label].title}
                  </tspan>
                  <tspan x={x} dy="1.5em" fontSize={10} fill="#f2f4f7">
                    {tickLabels[label].description}
                  </tspan>
                  <tspan x={x} dy="1.5em" fill="#5c98f1">
                    {Math.round(
                      +token[tickLabels[label].key as keyof TokenShortType],
                    )}
                    {tickLabels[label].isPercent && '%'}
                  </tspan>
                </text>
              </g>
            );
          }}
        />
        <Radar
          dataKey="percent"
          stroke="#5c98f1"
          fill="#5c98f1"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

ChartWithTokenScoresComponent.displayName = 'ChartWithTokenScores';
