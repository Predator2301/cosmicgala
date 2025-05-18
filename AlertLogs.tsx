import React from 'react';
import { Alert } from '../types';

interface AlertLogsProps {
  alerts: Alert[];
}

const AlertLogs: React.FC<AlertLogsProps> = ({ alerts }) => {
  // Limit displayed alerts to latest 3
  const recentAlerts = alerts.slice(0, 3);

  // If no alerts, show a placeholder message
  if (recentAlerts.length === 0) {
    return (
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Recent Alerts</h3>
        <p className="text-xs text-gray-400">No recent alerts</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-300 mb-2">Recent Alerts</h3>
      <div className="space-y-2">
        {recentAlerts.map((alert) => {
          const alertTime = new Date(alert.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
          
          return (
            <div key={alert.id} className="text-xs bg-gray-900 p-2 rounded flex justify-between">
              <div>
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                  alert.severity === 'high' ? 'bg-red-500' : 
                  alert.severity === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
                }`}></span>
                <span className="text-gray-200">{alert.message}</span>
              </div>
              <span className="text-gray-400 ml-2">{alertTime}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertLogs;