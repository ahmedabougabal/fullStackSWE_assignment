import axios from 'axios';
import { FinancialStatement } from '../types/FinancialData';

const API_KEY = import.meta.env.VITE_FMP_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://financialmodelingprep.com/api/v3';

if (!API_KEY) {
  console.error('API Key is not configured. Please set VITE_FMP_API_KEY environment variable.');
}

export const fetchFinancialData = async (): Promise<FinancialStatement[]> => {
  if (!API_KEY) {
    throw new Error('API Key is not configured. Please check your environment variables.');
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/income-statement/AAPL?period=annual&apikey=${API_KEY}`
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Invalid response format from API');
    }

    return response.data.map((item: any) => ({
      date: item.date,
      revenue: item.revenue,
      netIncome: item.netIncome,
      grossProfit: item.grossProfit,
      eps: item.eps,
      operatingIncome: item.operatingIncome,
    }));
  } catch (error) {
    console.error('Error fetching financial data:', error);
    throw error;
  }
};
