import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { FilterCriteria } from '../types/FinancialData';
import { Sliders, ChevronUp, ChevronDown } from 'lucide-react';
// missed filter panel commit message
interface FilterPanelProps {
  filters: FilterCriteria;
  onFilterChange: (filters: FilterCriteria) => void;
}

const MIN_YEAR = 2020;
const MAX_YEAR = 2024;

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleInputChange = (
    category: keyof FilterCriteria,
    field: 'startYear' | 'endYear' | 'min' | 'max',
    value: string
  ) => {
    const numValue = value === '' ? 0 : Number(value);
    onFilterChange({
      ...filters,
      [category]: {
        ...filters[category],
        [field]: numValue,
      },
    });
  };

  const handleYearChange = (
    field: 'startYear' | 'endYear',
    increment: boolean
  ) => {
    const currentValue = filters.dateRange[field];
    const newValue = increment ? currentValue + 1 : currentValue - 1;
    
    if (newValue >= MIN_YEAR && newValue <= MAX_YEAR) {
      onFilterChange({
        ...filters,
        dateRange: {
          ...filters.dateRange,
          [field]: newValue,
        },
      });
    }
  };

  const YearInput = ({ 
    id, 
    value, 
    onChange, 
    label 
  }: { 
    id: 'startYear' | 'endYear';
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
  }) => {
    const isMinYear = value === MIN_YEAR;
    const isMaxYear = value === MAX_YEAR;

    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        <div className="flex items-center space-x-2">
          <Input
            id={id}
            type="number"
            value={value}
            onChange={onChange}
            min={MIN_YEAR}
            max={MAX_YEAR}
            className="w-full transition-colors focus:border-primary hover:border-primary/50"
          />
          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleYearChange(id, true)}
              disabled={isMaxYear}
              className={`p-1 rounded transition-colors ${
                isMaxYear 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-primary/10'
              }`}
              aria-label={`Increment ${label}`}
            >
              <ChevronUp className={`h-4 w-4 ${isMaxYear ? 'text-muted-foreground' : 'text-primary'}`} />
            </button>
            <button
              onClick={() => handleYearChange(id, false)}
              disabled={isMinYear}
              className={`p-1 rounded transition-colors ${
                isMinYear 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-primary/10'
              }`}
              aria-label={`Decrement ${label}`}
            >
              <ChevronDown className={`h-4 w-4 ${isMinYear ? 'text-muted-foreground' : 'text-primary'}`} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full hover:shadow-md transition-all duration-200 bg-background border-border">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Sliders className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg sm:text-xl">Filters</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <YearInput
            id="startYear"
            value={filters.dateRange.startYear}
            onChange={(e) => handleInputChange('dateRange', 'startYear', e.target.value)}
            label="Start Year"
          />

          <YearInput
            id="endYear"
            value={filters.dateRange.endYear}
            onChange={(e) => handleInputChange('dateRange', 'endYear', e.target.value)}
            label="End Year"
          />

          <div className="space-y-2">
            <Label htmlFor="minRevenue" className="text-sm font-medium">
              Min Revenue (USD)
            </Label>
            <Input
              id="minRevenue"
              type="number"
              value={filters.revenueRange.min}
              onChange={(e) => handleInputChange('revenueRange', 'min', e.target.value)}
              min={0}
              className="w-full transition-colors focus:border-primary hover:border-primary/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxRevenue" className="text-sm font-medium">
              Max Revenue (USD)
            </Label>
            <Input
              id="maxRevenue"
              type="number"
              value={filters.revenueRange.max}
              readOnly
              className="w-full bg-muted cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minNetIncome" className="text-sm font-medium">
              Min Net Income (USD)
            </Label>
            <Input
              id="minNetIncome"
              type="number"
              value={filters.netIncomeRange.min}
              readOnly
              className="w-full bg-muted cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxNetIncome" className="text-sm font-medium">
              Max Net Income (USD)
            </Label>
            <Input
              id="maxNetIncome"
              type="number"
              value={filters.netIncomeRange.max}
              readOnly
              className="w-full bg-muted cursor-not-allowed"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
