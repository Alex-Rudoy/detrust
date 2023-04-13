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

import { TokensPageProps } from '../TokensPage.types';

export const VisualizationsTabComponent = ({ tokens }: TokensPageProps) => {
  return (
    <ResponsiveContainer height={400}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 10,
          left: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" type="number" name="stature" unit="cm" />
        <YAxis dataKey="y" type="number" name="weight" unit="kg" />
        <ZAxis
          dataKey="z"
          type="number"
          range={[64, 144]}
          name="score"
          unit="km"
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        {/* <Legend /> */}
        <Scatter name="A school" data={[]} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

VisualizationsTabComponent.displayName = 'VisualizationsTab';
