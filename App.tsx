import React from 'react';
import { Delete as Helmet } from 'lucide-react';
import DashboardLayout from './components/DashboardLayout';
import { WorkerDataProvider } from './context/WorkerDataContext';
import SettingsPanel from './components/SettingsPanel';
import NotificationsPanel from './components/NotificationsPanel';

function App() {
  return (
    <WorkerDataProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        <header className="bg-gray-800 border-b border-gray-700 p-4 shadow-md">
          <div className="container mx-auto flex items-center justify-center md:justify-start gap-3">
            <Helmet size={28} className="text-green-400" />
            <h1 className="text-2xl font-bold text-center">VitaShell - Smart Safety Helmet</h1>
          </div>
        </header>
        
        <DashboardLayout />
        <SettingsPanel />
        <NotificationsPanel />
        
        <footer className="bg-gray-800 border-t border-gray-700 text-center p-4 text-sm text-gray-400">
          <div className="container mx-auto">
            &copy; 2025 VitaShell Team. All Rights Reserved.
          </div>
        </footer>
      </div>
    </WorkerDataProvider>
  );
}

export default App;