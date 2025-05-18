import React from 'react';
import { Worker } from '../types';
import ChartContainer from './ChartContainer';
import StatusIndicator from './StatusIndicator';
import AlertLogs from './AlertLogs';
import { Battery, MapPin, Phone } from 'lucide-react';

interface WorkerCardProps {
  worker: Worker;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker }) => {
  const { name, currentData, alerts, location, batteryLevel, lastSync } = worker;
  const isGasLeak = currentData.gasLevel > 100;

  const handleEmergencyCall = () => {
    // In a real implementation, this would trigger the SIM800 module
    alert(`Initiating emergency call for ${name} at ${location}`);
    // Emergency numbers
    const emergencyNumbers = ['108', '112'];
  };

  return (
    <div className={`bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 hover:border-gray-600 transition-all ${
      isGasLeak ? 'border-red-500 animate-pulse' : ''
    }`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">{name}</h2>
          <div className="flex items-center text-sm text-gray-400 mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
        </div>
        <StatusIndicator 
          pulse={currentData.pulse} 
          aqi={currentData.aqi} 
          humidity={currentData.humidity}
          gasLevel={currentData.gasLevel}
        />
      </div>

      {isGasLeak && (
        <div className="bg-red-900/50 text-red-100 p-3 rounded-lg mb-4 text-sm">
          <strong>WARNING:</strong> High levels of {currentData.gasType} detected!
          <button
            onClick={handleEmergencyCall}
            className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Emergency Call
          </button>
        </div>
      )}

      <div className="space-y-4">
        <ChartContainer 
          title="Pulse Rate" 
          value={`${currentData.pulse} bpm`}
          data={worker.pulseHistory} 
          chartType="line"
          color="rgba(239, 68, 68, 0.7)"
          borderColor="rgba(239, 68, 68, 1)"
          className="h-32"
        />
        
        <ChartContainer 
          title="Air Quality Index" 
          value={currentData.aqi.toString()}
          data={worker.aqiHistory} 
          chartType="bar"
          color="rgba(59, 130, 246, 0.7)"
          borderColor="rgba(59, 130, 246, 1)"
          className="h-32"
        />
        
        <ChartContainer 
          title="Humidity" 
          value={`${currentData.humidity}%`}
          data={worker.humidityHistory} 
          chartType="line"
          color="rgba(16, 185, 129, 0.7)"
          borderColor="rgba(16, 185, 129, 1)"
          className="h-32"
          fill={true}
        />
      </div>

      <div className="mt-4 border-t border-gray-700 pt-3">
        <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
          <div className="flex items-center">
            <Battery className="w-4 h-4 mr-1" />
            <span>{batteryLevel}%</span>
          </div>
          <span>Last sync: {new Date(lastSync).toLocaleTimeString()}</span>
        </div>
        <AlertLogs alerts={alerts} />
      </div>
    </div>
  );
};

export default WorkerCard;