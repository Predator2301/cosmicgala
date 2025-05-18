import { Worker, DataPoint, Alert } from '../types';

// Generate a random integer between min and max (inclusive)
export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate a random value within a reasonable range of the current value
export const generateRandomValue = (
  currentValue: number, 
  min: number, 
  max: number, 
  maxChange: number
): number => {
  const change = (Math.random() * maxChange * 2) - maxChange;
  const newValue = currentValue + change;
  
  // Ensure the value stays within the specified range
  if (newValue < min) return min;
  if (newValue > max) return max;
  return Math.round(newValue);
};

// Generate historical data points
const generateHistoricalData = (
  count: number, 
  minValue: number, 
  maxValue: number
): DataPoint[] => {
  const now = new Date().getTime();
  const data: DataPoint[] = [];
  
  for (let i = count - 1; i >= 0; i--) {
    data.push({
      timestamp: now - (i * 2000), // 2 seconds apart
      value: getRandomInt(minValue, maxValue)
    });
  }
  
  return data;
};

// Generate example alerts
const generateExampleAlerts = (workerId: string, count: number): Alert[] => {
  const now = new Date().getTime();
  const alerts: Alert[] = [];
  const messages = [
    'High pulse rate detected',
    'Dangerous air quality',
    'High humidity level',
    'Low humidity level',
    'Temperature exceeding safe limit',
    'Carbon Monoxide detected',
    'Methane gas detected',
    'Hydrogen Sulfide detected'
  ];
  const sources = ['MQ2', 'DHT11', 'Pulse Sensor', 'CO Sensor', 'H2S Sensor'];
  
  for (let i = 0; i < count; i++) {
    alerts.push({
      id: `alert-${workerId}-${i}`,
      timestamp: now - (i * 15 * 60000), // 15 minutes apart
      message: messages[Math.floor(Math.random() * messages.length)],
      severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
      source: sources[Math.floor(Math.random() * sources.length)]
    });
  }
  
  return alerts;
};

const mineLocations = [
  'North Shaft - Level 2',
  'South Tunnel - Section B',
  'East Wing - Extraction Zone',
  'West Mine - Drilling Area',
  'Central Hub - Processing Unit',
  'Deep Mine - Level 3',
  'Surface Operations - Block A',
  'Underground Chamber - Section C',
  'Ventilation Shaft - Level 1',
  'Material Transport - Tunnel D'
];

// Generate initial data for all workers
export const generateInitialWorkerData = (): Worker[] => {
  const workerNames = [
    'Bipin', 'Divya', 'Harshit', 'Kushagra',
    'Rajesh', 'Priya', 'Amit', 'Sneha',
    'Vikram', 'Meera'
  ];
  
  return workerNames.map((name, index) => {
    const id = `worker-${index + 1}`;
    
    // Generate random current values
    const pulse = getRandomInt(60, 100);
    const aqi = getRandomInt(50, 150);
    const humidity = getRandomInt(30, 60);
    
    return {
      id,
      name,
      location: mineLocations[index],
      currentData: {
        pulse,
        aqi,
        humidity,
        gasLevel: getRandomInt(0, 300),
        gasType: 'CO'
      },
      pulseHistory: generateHistoricalData(15, 60, 120),
      aqiHistory: generateHistoricalData(15, 50, 200),
      humidityHistory: generateHistoricalData(15, 25, 70),
      alerts: generateExampleAlerts(id, 5),
      batteryLevel: getRandomInt(30, 100),
      lastSync: new Date().getTime()
    };
  });
};