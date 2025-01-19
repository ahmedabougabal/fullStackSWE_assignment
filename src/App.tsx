import { useState, useEffect } from 'react';
import { FilterPanel } from './components/FilterPanel';
import { Dashboard } from './components/Dashboard';
import { ExportButton } from './components/ExportButton';
import { ThemeProvider } from './components/theme/theme-provider';
import { ThemeToggle } from './components/theme/theme-toggle';
import { fetchFinancialData } from './services/api';
import { filterData } from './utils/filters';
import { 
  FinancialStatement, 
  FilterCriteria
} from './types/FinancialData';

function App() {
  const [data, setData] = useState<FinancialStatement[]>([]);
  const [filteredData, setFilteredData] = useState<FinancialStatement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<FilterCriteria>({
    dateRange: { startYear: 2020, endYear: 2024 },
    revenueRange: { min: 0, max: 1000000000000 },
    netIncomeRange: { min: 0, max: 1000000000000 },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const financialData = await fetchFinancialData();
        setData(financialData);
        setFilteredData(financialData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch financial data. Please try again later.');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const result = filterData(data, filters);
    setFilteredData(result);
  }, [data, filters]);

  const handleFilterChange = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-xl text-destructive px-4 text-center">{error}</div>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <div className="min-h-screen w-full bg-background overflow-x-hidden">
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight truncate">
                Apple Inc. Financial Analysis
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">
                Comprehensive financial data analysis and visualization
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 self-end sm:self-auto">
              <ExportButton data={filteredData} />
              <ThemeToggle />
            </div>
          </header>

          <main className="space-y-4 sm:space-y-6 lg:space-y-8">
            <FilterPanel 
              filters={filters} 
              onFilterChange={handleFilterChange} 
            />
            
            <Dashboard 
              data={filteredData}
            />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
