import axios from 'axios';
import { FinancialStatement } from '../types/FinancialData';

const API_KEY = import.meta.env.VITE_FMP_API_KEY;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchFinancialData = async (): Promise<FinancialStatement[]> => {
  try {
    const response = await axios.get(
      `${BASE_URL}/income-statement/AAPL?period=annual&apikey=${API_KEY}`
    );

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
