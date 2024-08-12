import React, { useState, useEffect } from 'react';
import useProfileStore from '../zustand/sensorProfileZustand';

const DeleteSensorProfile = () => {
  const { profiles, deleteProfile, refreshProfiles } = useProfileStore((state) => ({
    profiles: state.profiles,
    deleteProfile: state.deleteProfile,
    refreshProfiles: state.refreshProfiles
  }));
  const [selectedProfile, setSelectedProfile] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    refreshProfiles();
  }, [refreshProfiles]);

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!selectedProfile) {
      setError('Profile name is required');
      return;
    }

    try {
      await deleteProfile(selectedProfile);
      setMessage('Sensor profile deleted successfully');
      setSelectedProfile(''); // Clear selection after successful deletion
    } catch (err) {
      setError('Error deleting sensor profile');
    }
  };

  return (
    <div className="w-full mt-8 mb-4 max-w-xs px-8 bg-gradient-to-b from-gray-600 to-gray-700 p-8 rounded-2xl shadow-2xl animate-fadeIn hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Delete Sensor Profile</h1>
      <form onSubmit={handleDelete}>
        <div className="mb-4">
          <label htmlFor="profile" className="text-gray-300 text-sm mb-1 capitalize block">
            Select Sensor Profile:
          </label>
          <select
            id="profile"
            value={selectedProfile}
            onChange={(e) => setSelectedProfile(e.target.value)}
            required
            className="w-full hover:scale-105 px-3 py-2 bg-gray-200 border  border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          >
            <option value="">Select Profile</option>
            {profiles.map(profile => (
              <option key={profile.name} value={profile.name}>
                {profile.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-500 hover:scale-105 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-transform duration-300 ease-in-out"
        >
          Delete
        </button>
        {message && <p className="mt-4 text-center text-sm text-gray-300">{message}</p>}
        {error && <p className="mt-4 text-center text-sm text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default DeleteSensorProfile;
