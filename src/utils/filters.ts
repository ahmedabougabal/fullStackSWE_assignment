import { FinancialStatement, FilterCriteria, SortField, SortOrder } from '../types/FinancialData';

export const filterData = (
  data: FinancialStatement[],
  criteria: FilterCriteria
): FinancialStatement[] => {
  return data.filter((item) => {
    const year = new Date(item.date).getFullYear();
    const withinDateRange =
      year >= criteria.dateRange.startYear && year <= criteria.dateRange.endYear;

    const withinRevenueRange =
      item.revenue >= criteria.revenueRange.min &&
      item.revenue <= criteria.revenueRange.max;

    const withinNetIncomeRange =
      item.netIncome >= criteria.netIncomeRange.min &&
      item.netIncome <= criteria.netIncomeRange.max;

    return withinDateRange && withinRevenueRange && withinNetIncomeRange;
  });
};

export const sortData = (
  data: FinancialStatement[],
  field: SortField,
  order: SortOrder
): FinancialStatement[] => {
  return [...data].sort((a, b) => {
    let comparison = 0;
    
    switch (field) {
      case 'date':
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case 'revenue':
        comparison = a.revenue - b.revenue;
        break;
      case 'netIncome':
        comparison = a.netIncome - b.netIncome;
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });
};
