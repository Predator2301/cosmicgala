import React, { useState } from 'react';
import { Bell, X } from 'lucide-react';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'critical';
  timestamp: Date;
}

const NotificationsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'High gas level detected for Bipin!',
      type: 'critical',
      timestamp: new Date(),
    },
    {
      id: '2',
      message: 'Battery low for Harshit\'s helmet',
      type: 'warning',
      timestamp: new Date(Date.now() - 300000),
    },
  ]);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-20 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed right-0 top-0 h-full w-80 bg-gray-800 shadow-lg p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Notifications</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>

          {notifications.length === 0 ? (
            <p className="text-gray-400 text-center">No new notifications</p>
          ) : (
            <div className="space-y-4">
              {notifications.map(notification => (
                <div
                  key={notification.id}
                  className="bg-gray-700 rounded-lg p-4 relative"
                >
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${getNotificationColor(notification.type)}`} />
                    <span className="text-sm font-medium">
                      {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{notification.message}</p>
                  <p className="text-xs text-gray-400">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NotificationsPanel;