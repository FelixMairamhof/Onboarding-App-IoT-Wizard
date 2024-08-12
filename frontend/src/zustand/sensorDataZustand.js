import { create } from 'zustand';
import axios from 'axios';

const useSensorDataStore = create((set) => ({
    sensorData: [],
    loading: false,
    error: '',
    
    fetchSensorData: async () => {
      set({ loading: true });
      try {
        const response = await axios.get("http://localhost:3000/api/sensor-data");
        if (Array.isArray(response.data)) {
          set({ sensorData: response.data });
        } else {
          set({ error: 'Unexpected response data format' });
        }
      } catch (error) {
        set({ error: `Error fetching sensor data: ${error.message}` });
      } finally {
        set({ loading: false });
      }
    },
  
    deleteSensorData: async (serialNumber) => {
      set({ loading: true });
      try {
        await axios.delete("http://localhost:3000/api/sensor-data", {
          data: { serial_number: serialNumber }
        });
        set((state) => ({
          sensorData: state.sensorData.filter(sensor => sensor.serial_number !== serialNumber)
        }));
      } catch (error) {
        set({ error: `Error deleting sensor data: ${error.message}` });
      } finally {
        set({ loading: false });
      }
    },
  
    updateSensorData: async (formData) => {
      set({ loading: true });
      try {
        const response = await axios.put("http://localhost:3000/api/sensor-data", formData);
        set((state) => ({
          sensorData: state.sensorData.map(sensor =>
            sensor.serial_number === formData.serialNumber ? response.data : sensor
          )
        }));
        return response.data;
      } catch (error) {
        set({ error: `Error updating sensor data: ${error.message}` });
        throw error;
      } finally {
        set({ loading: false });
      }
    },
  
    addSensorData: async (newData) => {
      set({ loading: true });
      try {
        const response = await axios.post("http://localhost:3000/api/sensor-data", newData);
        set((state) => ({
          sensorData: [...state.sensorData, ...response.data]
        }));
      } catch (error) {
        set({ error: `Error adding sensor data: ${error.message}` });
      } finally {
        set({ loading: false });
      }
    },
  }));
  export default useSensorDataStore;