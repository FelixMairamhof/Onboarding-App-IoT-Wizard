import React, { useState, useCallback, useEffect } from 'react';
import LogOut from './LogOut';
import QrScanner from './QrScanner'; 
import axios from 'axios';

export default function CerpStackPage({ setIsOnInstructionPage, setActiveSensorProfile }) {
  const [selectedProject, setSelectedProject] = useState('');
  const [seriesNumber, setSeriesNumber] = useState('');
  const [formError, setFormError] = useState('');
  const [sensors, setSensors] = useState([]);
  const [numberText, setNumberText] = useState('Wähle davor einen Sensor aus');

  useEffect(() => {
    getAllSensorProfiles();
  }, []);

  const getAllSensorProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/sensor-profile');
      setSensors(response.data);
    } catch (err) {
      setFormError('Fehler beim Laden der Sensorprofile');
      console.error('Error fetching sensor profiles:', err);
    }
  };

  const handleProjectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedProject(selectedValue);

    const selectedSensor = sensors.find(sensor => sensor.name === selectedValue);
    if (selectedSensor) {
      setNumberText(`${selectedSensor.qr_result} eingeben`);
    } else {
      setNumberText('Wähle davor einen Sensor aus');
    }
  };

  const handleSeriesNumberChange = (e) => {
    setSeriesNumber(e.target.value);
  };

  const handleQrScan = useCallback((text) => {
    setSeriesNumber(text); // Update seriesNumber with QR scan result
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedProject || !seriesNumber) {
      setFormError('Bitte wählen Sie einen Sensor aus und geben Sie eine Seriennummer ein.');
      return;
    }
  
    try {
      const selectedSensor = sensors.find(sensor => sensor.name === selectedProject);
      const qrResult = selectedSensor.qr_result; 
      
      const response = await axios.post('http://localhost:3000/api/sensor-data-check', {
        number: seriesNumber,
        whichNumber: qrResult,
      });
      
      if (response.data.exists) {
        setActiveSensorProfile(selectedSensor); // Pass the selected sensor profile
        setIsOnInstructionPage(true); // Navigate to the instruction page
        setFormError('');
      } else {
        setFormError(`Die ${qrResult} (${seriesNumber}) gibt es nicht`);
      }

    } catch (err) {
      setFormError('Fehler beim Überprüfen der Sensordaten');
      console.error(err);
    }
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
              <option key={index} value={sensor.name}>
                {sensor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            {numberText}
          </label>
          <input
            type="text"
            required
            value={seriesNumber}
            onChange={handleSeriesNumberChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
            placeholder={numberText}
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
