export interface FinancialStatement {
  date: string;
  revenue: number;
  netIncome: number;
  grossProfit: number;
  eps: number;
  operatingIncome: number;
}

export interface DateRange {
  startYear: number;
  endYear: number;
}

export interface ValueRange {
  min: number;
  max: number;
}

export interface FilterCriteria {
  dateRange: DateRange;
  revenueRange: ValueRange;
  netIncomeRange: ValueRange;
}

export type SortField = 'date' | 'revenue' | 'netIncome';
export type SortOrder = 'asc' | 'desc';
