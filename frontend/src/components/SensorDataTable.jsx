// components/SensorDataTable.jsx

import React, { useEffect } from 'react';
import useSensorDataStore from '../zustand/sensorDataZustand';

const SensorDataTable = () => {
  // Access state and actions from Zustand store
  const { sensorData, loading, error, fetchSensorData } = useSensorDataStore((state) => ({
    sensorData: state.sensorData,
    loading: state.loading,
    error: state.error,
    fetchSensorData: state.fetchSensorData,
  }));

  // Fetch sensor data when component mounts
  useEffect(() => {
    fetchSensorData();
  }, [fetchSensorData]);

  // Show loading state
  if (loading) return <div className="text-center text-white">Loading...</div>;

  // Show error message if any
  if (error) return <div className="text-center text-red-400">{error}</div>;

  return (
    <div className="w-full mt-8 mb-4 px-4 bg-gradient-to-b from-gray-600 to-gray-700 p-8 rounded-2xl shadow-2xl animate-fadeIn hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Sensor Data Overview</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-700 text-gray-200">
              <th className="px-4 py-2 border-b border-gray-600">Serial Number</th>
              <th className="px-4 py-2 border-b border-gray-600">Dev EUI</th>
              <th className="px-4 py-2 border-b border-gray-600">App EUI</th>
              <th className="px-4 py-2 border-b border-gray-600">App Key</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.length > 0 ? (
              sensorData.map((sensor) => (
                <tr key={sensor.serial_number} className="hover:bg-gray-700 transition-transform duration-300 ease-in-out">
                  <td className="px-4 py-2 border-b border-gray-600">{sensor.serial_number}</td>
                  <td className="px-4 py-2 border-b border-gray-600">{sensor.dev_eui}</td>
                  <td className="px-4 py-2 border-b border-gray-600">{sensor.app_eui}</td>
                  <td className="px-4 py-2 border-b border-gray-600">{sensor.app_key}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-400">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorDataTable;
