import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { FinancialStatement } from '../../types/FinancialData';

interface FinancialChartProps {
  data: FinancialStatement[];
  type: 'line' | 'bar';
  metric: keyof FinancialStatement;
  title: string;
}

const formatValue = (value: number) => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  return `$${value.toFixed(0)}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 border border-border p-2 rounded-lg shadow-lg backdrop-blur-sm">
        <p className="text-sm font-medium mb-1">Year: {label}</p>
        <p className="text-sm text-primary">
          Value: {formatValue(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

export const FinancialChart: React.FC<FinancialChartProps> = ({
  data,
  type,
  metric,
  title,
}) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const chartData = sortedData.map((item) => ({
    year: new Date(item.date).getFullYear(),
    value: item[metric] as number,
  }));

  const ChartComponent = type === 'line' ? LineChart : BarChart;
  const DataComponent = type === 'line' ? Line : Bar;

  return (
    <Card className="w-full h-full hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0 pb-4">
        <ResponsiveContainer width="100%" height="100%" minHeight={250}>
          <ChartComponent
            data={chartData}
            margin={{
              top: 16,
              right: 16,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              className="stroke-muted/20" 
            />
            <XAxis
              dataKey="year"
              className="text-xs"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis
              tickFormatter={formatValue}
              className="text-xs"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={type === 'bar' ? { fill: 'rgba(59, 130, 246, 0.1)' } : { stroke: 'rgb(59, 130, 246)' }}
            />
            <DataComponent
              type="monotone"
              dataKey="value"
              stroke="rgb(59, 130, 246)"
              fill={type === 'bar' ? 'rgb(59, 130, 246)' : 'url(#colorValue)'}
              strokeWidth={2}
              dot={type === 'line' ? { fill: 'rgb(59, 130, 246)', strokeWidth: 2 } : false}
              activeDot={type === 'line' ? { r: 6, fill: 'rgb(59, 130, 246)', stroke: 'white', strokeWidth: 2 } : false}
            />
          </ChartComponent>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
