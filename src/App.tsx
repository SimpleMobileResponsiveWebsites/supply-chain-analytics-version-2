import React, { useState } from 'react';
import { DataState, SupplyChainData } from './types/data';
import FileUpload from './components/FileUpload';
import DataTable from './components/DataTable';
import DataVisualization from './components/DataVisualization';
import { LayoutDashboard, Table, LineChart } from 'lucide-react';

function App() {
  const [currentTab, setCurrentTab] = useState<'upload' | 'table' | 'visualize'>('upload');
  const [dataState, setDataState] = useState<DataState>({ data: [], columns: [] });

  const handleDataLoaded = (data: SupplyChainData[], columns: string[]) => {
    setDataState({ data, columns });
    setCurrentTab('table');
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'upload':
        return <FileUpload onDataLoaded={handleDataLoaded} />;
      case 'table':
        return <DataTable data={dataState.data} columns={dataState.columns} />;
      case 'visualize':
        return <DataVisualization data={dataState.data} columns={dataState.columns} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <LayoutDashboard className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Supply Chain Analytics
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {dataState.data.length > 0 && (
          <div className="mb-6 flex space-x-4">
            <button
              onClick={() => setCurrentTab('upload')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                currentTab === 'upload' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              <LayoutDashboard size={20} />
              <span>Upload</span>
            </button>
            <button
              onClick={() => setCurrentTab('table')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                currentTab === 'table' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              <Table size={20} />
              <span>Data Table</span>
            </button>
            <button
              onClick={() => setCurrentTab('visualize')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                currentTab === 'visualize' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
              }`}
            >
              <LineChart size={20} />
              <span>Visualize</span>
            </button>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
