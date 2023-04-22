import { useCallback } from 'react';
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

import { gray_100, primary_100, primary_400 } from '@utils/colors';
import { postfixNumber } from '@utils/postfixNumber';
import { TokenType } from '@store/tokens/token/token.types';
import { useTokenSelector } from '@store/tokens/token/useTokenSelector';

export const ChartWithTokenScoresComponent = () => {
  const { token } = useTokenSelector();

  const CustomTick = useCallback(
    ({
      payload,
      x,
      y,
      textAnchor,
      stroke,
      radius,
    }: {
      payload: { value: string };
      x: number;
      y: number;
      textAnchor: string;
      stroke: string;
      radius: number;
    }) => {
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
            <tspan x={x} dy={tickLabels[label].dy} fill={primary_100}>
              {tickLabels[label].title}
            </tspan>
            <tspan x={x} dy="1.5em" fontSize={10} fill={gray_100}>
              {tickLabels[label].description}
            </tspan>
            <tspan x={x} dy="1.5em" fill={primary_400}>
              {tickLabels[label].isPercent
                ? `${Math.round(
                    +token[tickLabels[label].key as keyof TokenType] * 100,
                  )}%`
                : postfixNumber(
                    +token[tickLabels[label].key as keyof TokenType],
                  )}
            </tspan>
          </text>
        </g>
      );
    },
    [token],
  );

  return (
    <ResponsiveContainer height={500}>
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="80%"
        data={generateChartWithTokenScoresData(token)}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="quality" tickLine={false} tick={CustomTick} />
        <Radar
          dataKey="percent"
          stroke={primary_400}
          fill={primary_400}
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

ChartWithTokenScoresComponent.displayName = 'ChartWithTokenScores';
