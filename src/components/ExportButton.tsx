import React from 'react';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import { FinancialStatement } from '../types/FinancialData';

interface ExportButtonProps {
  data: FinancialStatement[];
}

export const ExportButton: React.FC<ExportButtonProps> = ({ data }) => {
  const exportToCSV = () => {
    const headers = [
      'Date',
      'Revenue',
      'Net Income',
      'Gross Profit',
      'EPS',
      'Operating Income'
    ];

    const csvData = data.map(item => [
      item.date,
      item.revenue,
      item.netIncome,
      item.grossProfit,
      item.eps,
      item.operatingIncome
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'financial_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={exportToCSV}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Export Data
    </Button>
  );
};
