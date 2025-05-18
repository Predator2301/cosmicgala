import React from 'react';

interface StatusIndicatorProps {
  pulse: number;
  aqi: number;
  humidity: number;
  gasLevel: number;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ pulse, aqi, humidity, gasLevel }) => {
  const isHealthy = 
    pulse >= 60 && pulse <= 100 && 
    aqi <= 100 && 
    humidity >= 30 && humidity <= 60 &&
    gasLevel <= 100;

  const getHealthStatus = () => {
    if (gasLevel > 100) {
      return {
        status: 'Critical - Gas Leak',
        color: 'text-red-500',
        bgColor: 'bg-red-500',
      };
    } else if (isHealthy) {
      return {
        status: 'Healthy',
        color: 'text-green-400',
        bgColor: 'bg-green-400',
      };
    } else if (pulse > 120 || aqi > 200) {
      return {
        status: 'Critical',
        color: 'text-red-500',
        bgColor: 'bg-red-500',
      };
    } else {
      return {
        status: 'Warning',
        color: 'text-yellow-400',
        bgColor: 'bg-yellow-400',
      };
    }
  };

  const { status, color, bgColor } = getHealthStatus();

  return (
    <div className="flex items-center">
      <div className={`h-3 w-3 rounded-full ${bgColor} animate-pulse mr-2`}></div>
      <span className={`text-sm font-medium ${color}`}>{status}</span>
    </div>
  );
};

export default StatusIndicator;