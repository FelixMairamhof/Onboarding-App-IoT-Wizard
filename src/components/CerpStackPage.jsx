import React, { useState, useCallback } from 'react';
import LogOut from './LogOut';
import QrScanner from './QrScanner'; 

export default function CerpStackPage() {
  const [selectedProject, setSelectedProject] = useState('');
  const [seriesNumber, setSeriesNumber] = useState('');
  const sensors = ["Rasby", "Microtik", "ESP32", "Arduino"];

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleSeriesNumberChange = (e) => {
    setSeriesNumber(e.target.value);
  };

  const handleQrScan = useCallback((text) => {
    setSeriesNumber(text); // Update seriesNumber with QR scan result
  }, []);

  return (
    <div className="p-6 m-4 rounded-2xl bg-gradient-to-b from-gray-600 to-gray-700 text-gray-200 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Neuer Sensor</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Sensor-Auswahl
        </label>
        <select
          value={selectedProject}
          onChange={handleProjectChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <option value="" disabled>
            Sensor auswählen
          </option>
          {sensors.map((sensor, index) => (
            <option key={index} value={sensor}>
              {sensor}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Add Series Number
        </label>
        <input
          type="text"
          value={seriesNumber}
          onChange={handleSeriesNumberChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter Series Number"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Scan a QR code
        </label>
        <QrScanner onScan={handleQrScan} />
      </div>

    </div>
  );
}
