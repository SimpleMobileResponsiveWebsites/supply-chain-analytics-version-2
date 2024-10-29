export interface SupplyChainData {
  [key: string]: string | number;
}

export interface DataState {
  data: SupplyChainData[];
  columns: string[];
}

export type ChartType = 'line' | 'bar' | 'scatter';
