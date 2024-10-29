import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import Papa from 'papaparse';
import { SupplyChainData } from '../types/data';

interface FileUploadProps {
  onDataLoaded: (data: SupplyChainData[], columns: string[]) => void;
}

export default function FileUpload({ onDataLoaded }: FileUploadProps) {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        const data = results.data as SupplyChainData[];
        const columns = results.meta.fields || [];
        onDataLoaded(data, columns);
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
        alert('Error parsing CSV file. Please check the format and try again.');
      }
    });
  }, [onDataLoaded]);

  return (
    <div className="w-full max-w-2xl mx-auto p-8">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
        <label className="cursor-pointer block">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium text-gray-700">Drop your CSV file here</p>
          <p className="text-sm text-gray-500 mt-2">or click to browse</p>
        </label>
      </div>
    </div>
  );
}
