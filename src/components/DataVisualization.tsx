import React, { useState, useMemo } from 'react';
import { 
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { SupplyChainData, ChartType } from '../types/data';
import { BarChart2, LineChart as LineChartIcon, ScatterChart as ScatterIcon } from 'lucide-react';

interface DataVisualizationProps {
  data: SupplyChainData[];
  columns: string[];
}

export default function DataVisualization({ data, columns }: DataVisualizationProps) {
  const [xAxis, setXAxis] = useState<string>(columns[0] || '');
  const [yAxis, setYAxis] = useState<string>(columns[1] || '');
  const [chartType, setChartType] = useState<ChartType>('line');

  const chartData = useMemo(() => {
    return data.map(row => ({
      x: row[xAxis],
      y: Number(row[yAxis])
    }));
  }, [data, xAxis, yAxis]);

  const renderChart = () => {
    const commonProps = {
      width: 500,
      height: 300,
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="y" stroke="#8884d8" />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="y" fill="#8884d8" />
          </BarChart>
        );
      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            <CartesianGrid />
            <XAxis dataKey="x" />
            <YAxis dataKey="y" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={chartData} fill="#8884d8" />
          </ScatterChart>
        );
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex gap-4 mb-6">
        <select
          value={xAxis}
          onChange={(e) => setXAxis(e.target.value)}
          className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {columns.map(column => (
            <option key={column} value={column}>{column}</option>
          ))}
        </select>
        <select
          value={yAxis}
          onChange={(e) => setYAxis(e.target.value)}
          className="block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          {columns.map(column => (
            <option key={column} value={column}>{column}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`p-2 rounded ${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            <LineChartIcon size={20} />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`p-2 rounded ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            <BarChart2 size={20} />
          </button>
          <button
            onClick={() => setChartType('scatter')}
            className={`p-2 rounded ${chartType === 'scatter' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            <ScatterIcon size={20} />
          </button>
        </div>
      </div>
      <div className="w-full h-[400px]">
        <ResponsiveContainer>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
