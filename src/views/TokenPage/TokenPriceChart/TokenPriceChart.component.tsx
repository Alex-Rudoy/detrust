import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { FontWeightEnum, Text, TextSizeEnum } from '@components/Text';
import { TokenPriceChartProps } from './TokenPriceChart.types';

import styles from './TokenPriceChart.module.scss';

export const TokenPriceChartComponent = ({
  tokenPrice,
}: TokenPriceChartProps) => {
  return (
    <div className={styles.tokenPriceChart}>
      <Text
        size={TextSizeEnum.S24}
        fontWeight={FontWeightEnum.FW500}
        className={styles.heading}
      >
        Mentions
      </Text>
      <ResponsiveContainer height={500}>
        <LineChart
          width={500}
          height={300}
          data={tokenPrice}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="dt"
            tickFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <YAxis dataKey="price" />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            dot={false}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

TokenPriceChartComponent.displayName = 'TokenPriceChart';
