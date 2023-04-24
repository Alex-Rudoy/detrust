import { useState } from 'react';
import { useRouter } from 'next/router';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

import { routes } from '@views/routes';
import { PIE_CHART_COLORS } from './GroupTokensSection.constants';
import { PieChartTooltip } from './PieChartTooltip/PieChartTooltip';

import { GroupTokenType } from '@store/degens/groupTokens/groupTokens.types';
import { useGroupTokensSelector } from '@store/degens/groupTokens/useGroupTokensSelector';
import { PieChartCustomLabel } from './PieChartCustomLabel/PieChartCustomLabel';

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
            label={PieChartCustomLabel}
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
