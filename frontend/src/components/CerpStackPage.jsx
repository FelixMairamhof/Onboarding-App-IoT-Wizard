import React, { useState, useCallback } from 'react';
import LogOut from './LogOut';
import QrScanner from './QrScanner'; 

export default function CerpStackPage({ setIsOnCerpStackPage }) {
  const [selectedProject, setSelectedProject] = useState('');
  const [seriesNumber, setSeriesNumber] = useState('');
  const [formError, setFormError] = useState('');
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

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!selectedProject || !seriesNumber) {
      setFormError('Bitte wählen Sie einen Sensor aus und geben Sie eine Seriennummer ein.');
      return;
    }

    setFormError('');

    console.log('Formular übermittelt:', { selectedProject, seriesNumber });
    setIsOnCerpStackPage(false);
  };

  return (
    <div className="p-6 m-4 rounded-2xl bg-gradient-to-b from-gray-600 to-gray-700 text-gray-200 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Neuer Sensor</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Sensor-Auswahl
          </label>
          <select
            value={selectedProject}
            onChange={handleProjectChange}
            required
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
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
            Seriennummer hinzufügen
          </label>
          <input
            type="text"
            required
            value={seriesNumber}
            onChange={handleSeriesNumberChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
            placeholder="Seriennummer eingeben"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            QR-Code scannen
          </label>
          <QrScanner onScan={handleQrScan} />
        </div>

        <button
          type="submit"
          className="w-full p-2 shadow-2xl bg-gray-800 text-white rounded-2xl hover:bg-gray-700 focus:outline-none ring-2 ring-gray-500 transition-transform transform hover:scale-105"
        >
          Nächster Schritt
        </button>

        {formError && (
          <div className="mb-6 mt-4 text-center text-red-600">{formError}</div>
        )}
      </form>
    </div>
  );
}
