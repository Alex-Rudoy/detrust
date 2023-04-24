import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Label,
} from 'recharts';

import { routes } from '@views/routes';
import { PIE_CHART_COLORS } from './GroupTokensSection.constants';
import { PieChartTooltip } from './PieChartTooltip/PieChartTooltip';

import { GroupTokenType } from '@store/degens/groupTokens/groupTokens.types';
import { useGroupTokensSelector } from '@store/degens/groupTokens/useGroupTokensSelector';

const renderCustomizedLabel = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <path
        d={`M${cx},${cy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={4}
        textAnchor={textAnchor}
        fill="#333"
      >
        {payload.symbol}
      </text>
    </g>
  );
};

export const GroupTokensSectionComponent = () => {
  const { groupTokens } = useGroupTokensSelector();
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const handleMouseEnter = (_: unknown, index: number) => {
    setActiveIndex(index);
  };

  const handleClick = (token: GroupTokenType) => {
    if (!token.symbol) return;
    router.push(routes.tokenPage(token.symbol));
  };

  return (
    <div>
      <ResponsiveContainer height={600}>
        <PieChart height={600}>
          <Pie
            activeIndex={activeIndex}
            dataKey="mention_count"
            isAnimationActive={false}
            data={groupTokens}
            cx="50%"
            cy="50%"
            outerRadius={200}
            fill="#00000"
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {groupTokens.map((entry, index) => (
              <>
                <Cell
                  key={`pie-chart-cell-${entry.symbol}`}
                  fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]}
                />
              </>
            ))}
          </Pie>
          <Tooltip content={PieChartTooltip} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

GroupTokensSectionComponent.displayName = 'GroupTokensSection';
