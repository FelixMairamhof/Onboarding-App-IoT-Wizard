import React, { useEffect, useState } from 'react';
import useSensorDataStore from '../zustand/sensorDataZustand';

const UpdateSensorData = () => {
  const { sensorData, fetchSensorData, updateSensorData } = useSensorDataStore((state) => ({
    sensorData: state.sensorData,
    fetchSensorData: state.fetchSensorData,
    updateSensorData: state.updateSensorData,
  }));
  const [formData, setFormData] = useState({
    serialNumber: '',
    newSerialNumber: '',
    appEui: '',
    appKey: '',
    devEui: ''
  });
  const [resultMsg, setResultMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSensorData();
  }, [fetchSensorData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    const serialNumber = e.target.value;
    setFormData({ ...formData, serialNumber, newSerialNumber: '' });

    if (serialNumber) {
      const selectedSensor = sensorData.find(sensor => sensor.serial_number === serialNumber);
      if (selectedSensor) {
        setFormData({
          serialNumber: selectedSensor.serial_number,
          newSerialNumber: selectedSensor.serial_number,
          appEui: selectedSensor.app_eui || '',
          appKey: selectedSensor.app_key || '',
          devEui: selectedSensor.dev_eui || ''
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResultMsg('');
    setErrorMsg('');

    try {
      const updatedSensor = await updateSensorData(formData);
      setResultMsg(`Sensor data (${updatedSensor.serial_number}) updated successfully!`);
      setFormData({
        serialNumber: '',
        newSerialNumber: '',
        appEui: '',
        appKey: '',
        devEui: ''
      });
    } catch (error) {
      setErrorMsg('Error updating sensor data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-8 mb-4 max-w-xs px-12 bg-gradient-to-b from-gray-600 to-gray-700 p-8 rounded-2xl shadow-2xl animate-fadeIn hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Update Sensor Data</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="serialNumber" className="text-gray-300 text-sm mb-1">Select Sensor</label>
          <select
            id="serialNumber"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleSelectChange}
            required
            className="w-full px-3 py-2 hover:scale-105 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          >
            <option value="">Select Sensor</option>
            {sensorData.map(sensor => (
              <option key={sensor.serial_number} value={sensor.serial_number}>
                {sensor.serial_number}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="newSerialNumber" className="text-gray-300 text-sm mb-1">New Serial Number</label>
          <input
            id="newSerialNumber"
            type="text"
            name="newSerialNumber"
            placeholder="Enter new serial number"
            value={formData.newSerialNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 hover:scale-105 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="appEui" className="text-gray-300 text-sm mb-1">App EUI</label>
          <input
            id="appEui"
            type="text"
            name="appEui"
            placeholder="Enter App EUI"
            value={formData.appEui}
            onChange={handleChange}
            className="w-full px-3 py-2 hover:scale-105 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="appKey" className="text-gray-300 text-sm mb-1">App Key</label>
          <input
            id="appKey"
            type="text"
            name="appKey"
            placeholder="Enter App Key"
            value={formData.appKey}
            onChange={handleChange}
            className="w-full px-3 py-2 hover:scale-105 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="devEui" className="text-gray-300 text-sm mb-1">Dev EUI</label>
          <input
            id="devEui"
            type="text"
            name="devEui"
            placeholder="Enter Dev EUI"
            value={formData.devEui}
            onChange={handleChange}
            className="w-full px-3 py-2 hover:scale-105 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 hover:scale-105 rounded-md shadow-md ${isSubmitting ? 'bg-gray-400' : 'bg-gray-500'} text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-transform duration-300 ease-in-out`}
        >
          {isSubmitting ? 'Updating...' : 'Update Data'}
        </button>
      </form>
      {resultMsg && <div className="mt-4 text-gray-300 text-center">{resultMsg}</div>}
      {errorMsg && <div className="mt-4 text-red-400 text-center">{errorMsg}</div>}
    </div>
  );
};

export default UpdateSensorData;
