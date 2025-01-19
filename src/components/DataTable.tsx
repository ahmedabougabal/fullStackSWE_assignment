import React from 'react';
import { FinancialStatement, SortField, SortOrder } from '../types/FinancialData';

interface DataTableProps {
  data: FinancialStatement[];
  onSort: (field: SortField, order: SortOrder) => void;
  currentSortField?: SortField;
  currentSortOrder?: SortOrder;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const DataTable: React.FC<DataTableProps> = ({
  data,
  onSort,
  currentSortField,
  currentSortOrder,
}) => {
  const handleSort = (field: SortField) => {
    const newOrder: SortOrder = 
      field === currentSortField && currentSortOrder === 'asc' ? 'desc' : 'asc';
    onSort(field, newOrder);
  };

  const getSortIcon = (field: SortField) => {
    if (field !== currentSortField) return '↕️';
    return currentSortOrder === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th 
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort('date')}
            >
              Date {getSortIcon('date')}
            </th>
            <th 
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort('revenue')}
            >
              Revenue {getSortIcon('revenue')}
            </th>
            <th 
              className="px-6 py-3 cursor-pointer"
              onClick={() => handleSort('netIncome')}
            >
              Net Income {getSortIcon('netIncome')}
            </th>
            <th className="px-6 py-3">Gross Profit</th>
            <th className="px-6 py-3">EPS</th>
            <th className="px-6 py-3">Operating Income</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={item.date} 
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className="px-6 py-4">{item.date}</td>
              <td className="px-6 py-4">{formatCurrency(item.revenue)}</td>
              <td className="px-6 py-4">{formatCurrency(item.netIncome)}</td>
              <td className="px-6 py-4">{formatCurrency(item.grossProfit)}</td>
              <td className="px-6 py-4">${item.eps.toFixed(2)}</td>
              <td className="px-6 py-4">{formatCurrency(item.operatingIncome)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
