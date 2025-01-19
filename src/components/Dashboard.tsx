import React from 'react';
import { FinancialChart } from './charts/FinancialChart';
import { FinancialStatement } from '../types/FinancialData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardProps {
  data: FinancialStatement[];
}

const formatValue = (value: number) => {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  return `$${value.toFixed(0)}`;
};

const MetricCard: React.FC<{
  title: string;
  value: number;
  change?: number;
}> = ({ title, value, change }) => (
  <Card className="overflow-hidden hover:shadow-md transition-all duration-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium truncate">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-lg sm:text-xl lg:text-2xl font-bold truncate">
        {formatValue(value)}
      </div>
      {change !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-medium mt-1 ${
          change >= 0 ? "text-green-500" : "text-red-500"
        }`}>
          {change >= 0 ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          <span>
            {change >= 0 ? '+' : ''}{change.toFixed(1)}%
          </span>
        </div>
      )}
    </CardContent>
  </Card>
);

const calculateChange = (current: number, previous: number) => {
  return ((current - previous) / previous) * 100;
};

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const latestData = sortedData[0];
  const previousData = sortedData[1];

  return (
    <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <MetricCard
          title="Revenue"
          value={latestData.revenue}
          change={previousData ? calculateChange(latestData.revenue, previousData.revenue) : undefined}
        />
        <MetricCard
          title="Net Income"
          value={latestData.netIncome}
          change={previousData ? calculateChange(latestData.netIncome, previousData.netIncome) : undefined}
        />
        <MetricCard
          title="Gross Profit"
          value={latestData.grossProfit}
          change={previousData ? calculateChange(latestData.grossProfit, previousData.grossProfit) : undefined}
        />
        <MetricCard
          title="Operating Income"
          value={latestData.operatingIncome}
          change={previousData ? calculateChange(latestData.operatingIncome, previousData.operatingIncome) : undefined}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
        <div className="w-full h-[300px] sm:h-[400px]">
          <FinancialChart
            data={data}
            type="line"
            metric="revenue"
            title="Revenue Over Time"
          />
        </div>
        <div className="w-full h-[300px] sm:h-[400px]">
          <FinancialChart
            data={data}
            type="line"
            metric="netIncome"
            title="Net Income Over Time"
          />
        </div>
        <div className="w-full h-[300px] sm:h-[400px]">
          <FinancialChart
            data={data}
            type="bar"
            metric="grossProfit"
            title="Gross Profit Over Time"
          />
        </div>
        <div className="w-full h-[300px] sm:h-[400px]">
          <FinancialChart
            data={data}
            type="bar"
            metric="operatingIncome"
            title="Operating Income Over Time"
          />
        </div>
      </div>
    </div>
  );
};
