import React, { createContext, useContext, useState, useEffect } from 'react';
import { Worker, DataPoint, Alert } from '../types';
import { generateInitialWorkerData, generateRandomValue } from '../utils/dataGenerators';

interface WorkerDataContextType {
  workers: Worker[];
}

const WorkerDataContext = createContext<WorkerDataContextType>({
  workers: [],
});

export const useWorkerData = () => useContext(WorkerDataContext);

export const WorkerDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workers, setWorkers] = useState<Worker[]>(() => generateInitialWorkerData());

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWorkers(prevWorkers => 
        prevWorkers.map(worker => {
          const now = new Date().getTime();
          
          // Update current values with some random fluctuation
          const newPulse = generateRandomValue(worker.currentData.pulse, 60, 140, 5);
          const newAqi = generateRandomValue(worker.currentData.aqi, 50, 300, 15);
          const newHumidity = generateRandomValue(worker.currentData.humidity, 20, 80, 3);
          
          // Create new history entries
          const newPulseEntry: DataPoint = { timestamp: now, value: newPulse };
          const newAqiEntry: DataPoint = { timestamp: now, value: newAqi };
          const newHumidityEntry: DataPoint = { timestamp: now, value: newHumidity };
          
          // Manage history lengths (keep last 15 data points)
          const pulseHistory = [...worker.pulseHistory.slice(-14), newPulseEntry];
          const aqiHistory = [...worker.aqiHistory.slice(-14), newAqiEntry];
          const humidityHistory = [...worker.humidityHistory.slice(-14), newHumidityEntry];
          
          // Generate alerts if thresholds are exceeded
          let updatedAlerts = [...worker.alerts];
          
          if (newPulse > 120) {
            updatedAlerts = [
              {
                id: `alert-${worker.id}-${now}`,
                timestamp: now,
                message: 'High pulse rate detected',
                severity: 'high',
                source: 'MQ2'
              },
              ...updatedAlerts.slice(0, 9) // Keep last 10 alerts
            ];
          } else if (newAqi > 200) {
            updatedAlerts = [
              {
                id: `alert-${worker.id}-${now}`,
                timestamp: now,
                message: 'Dangerous air quality',
                severity: 'high',
                source: 'MQ2'
              },
              ...updatedAlerts.slice(0, 9)
            ];
          } else if (newHumidity > 70 || newHumidity < 25) {
            updatedAlerts = [
              {
                id: `alert-${worker.id}-${now}`,
                timestamp: now,
                message: `${newHumidity > 70 ? 'High' : 'Low'} humidity level`,
                severity: 'medium',
                source: 'DHT11'
              },
              ...updatedAlerts.slice(0, 9)
            ];
          }
          
          return {
            ...worker,
            currentData: {
              pulse: newPulse,
              aqi: newAqi,
              humidity: newHumidity
            },
            pulseHistory,
            aqiHistory,
            humidityHistory,
            alerts: updatedAlerts
          };
        })
      );
    }, 2000); // Update every 2 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <WorkerDataContext.Provider value={{ workers }}>
      {children}
    </WorkerDataContext.Provider>
  );
};