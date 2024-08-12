// zustand/sensorProfileZustand.js
import { create } from 'zustand';
import axios from 'axios';

const useProfileStore = create((set) => ({
  profiles: [],
  loading: false,
  error: '',
  refreshProfiles: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("http://localhost:3000/api/sensor-profile");
      set({ profiles: response.data });
    } catch (error) {
      set({ error: 'Error fetching sensor profiles' });
    } finally {
      set({ loading: false });
    }
  },
  addProfile: async (profileData) => {
    set({ loading: true });
    try {
      const response = await axios.post('http://localhost:3000/api/sensor-profile', profileData);
      set((state) => ({
        profiles: [...state.profiles, response.data]
      }));
      return response.data;
    } catch (error) {
      set({ error: 'Error creating sensor profile' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  deleteProfile: async (profileName) => {
    set({ loading: true });
    try {
      await axios.delete('http://localhost:3000/api/sensor-profile', {
        data: { name: profileName }
      });
      set((state) => ({
        profiles: state.profiles.filter(profile => profile.name !== profileName)
      }));
    } catch (error) {
      set({ error: 'Error deleting sensor profile' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  updateProfile: (updatedProfile) => set((state) => ({
    profiles: state.profiles.map(profile =>
      profile.name === updatedProfile.name ? updatedProfile : profile
    )
  })),
}));

export default useProfileStore;
