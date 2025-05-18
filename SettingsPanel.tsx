import React, { useState } from 'react';
import { Settings, Bell, Phone, Sun, Moon } from 'lucide-react';

interface ThresholdSettings {
  maxGasLevel: number;
  maxTemperature: number;
  maxHumidity: number;
  enableBuzzer: boolean;
  enableLED: boolean;
  enableSMS: boolean;
}

const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [settings, setSettings] = useState<ThresholdSettings>({
    maxGasLevel: 200,
    maxTemperature: 40,
    maxHumidity: 80,
    enableBuzzer: true,
    enableLED: true,
    enableSMS: false,
  });

  const handleSettingChange = (key: keyof ThresholdSettings, value: number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-4 p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
      >
        <Settings className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed right-0 top-0 h-full w-80 bg-gray-800 shadow-lg p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Settings</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Thresholds</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Max Gas Level (ppm)</label>
                  <input
                    type="number"
                    value={settings.maxGasLevel}
                    onChange={(e) => handleSettingChange('maxGasLevel', parseInt(e.target.value))}
                    className="w-full bg-gray-700 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Max Temperature (°C)</label>
                  <input
                    type="number"
                    value={settings.maxTemperature}
                    onChange={(e) => handleSettingChange('maxTemperature', parseInt(e.target.value))}
                    className="w-full bg-gray-700 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Max Humidity (%)</label>
                  <input
                    type="number"
                    value={settings.maxHumidity}
                    onChange={(e) => handleSettingChange('maxHumidity', parseInt(e.target.value))}
                    className="w-full bg-gray-700 rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Alerts</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.enableBuzzer}
                    onChange={(e) => handleSettingChange('enableBuzzer', e.target.checked)}
                    className="rounded bg-gray-700"
                  />
                  <span>Enable Buzzer</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.enableLED}
                    onChange={(e) => handleSettingChange('enableLED', e.target.checked)}
                    className="rounded bg-gray-700"
                  />
                  <span>Enable LED</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.enableSMS}
                    onChange={(e) => handleSettingChange('enableSMS', e.target.checked)}
                    className="rounded bg-gray-700"
                  />
                  <span>Enable SMS Alerts</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Theme</h3>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-5 h-5" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <input
                  type="tel"
                  placeholder="Emergency contact number"
                  className="flex-1 bg-gray-700 rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <select className="flex-1 bg-gray-700 rounded px-3 py-2">
                  <option value="all">All Notifications</option>
                  <option value="critical">Critical Only</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPanel;