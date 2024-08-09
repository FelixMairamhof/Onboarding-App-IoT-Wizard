import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DeleteSensorProfile = () => {
  const [sensorProfiles, setSensorProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch sensor profiles when the component mounts
  useEffect(() => {
    axios.get("http://localhost:3000/api/sensor-profile") // Adjust the endpoint to match your API route
      .then(response => {
        // Ensure response data is an array
        if (Array.isArray(response.data)) {
          setSensorProfiles(response.data);
        } else {
          console.error('Unexpected response data format:', response.data);
          setError('Error fetching sensor profiles.');
        }
      })
      .catch(error => {
        if (error.response) {
          console.error('API error response:', error.response.data);
          setError(`Error: ${error.response.data.message || 'An error occurred'}`);
        } else {
          console.error('Error:', error.message);
          setError('Error fetching sensor profiles.');
        }
      });
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!selectedProfile) {
      setError('Profile name is required');
      return;
    }

    try {
      const response = await axios.delete("http://localhost:3000/api/sensor-profile", {
        data: { name: selectedProfile },
      });
      setMessage(response.data.message || 'Sensor profile deleted successfully');

      // Update the state to remove the deleted profile
      setSensorProfiles(sensorProfiles.filter(profile => profile.name !== selectedProfile));
      setSelectedProfile(''); // Clear selection after successful deletion
    } catch (err) {
      console.error('Error deleting sensor profile:', err);
      setError(err.response?.data?.message || 'Error deleting sensor profile');
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
            className="w-full hover:scale-105 px-3 py-2 bg-gray-200 border text-gray-400 border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          >
            <option value="">Select Profile</option>
            {sensorProfiles.map(profile => (
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
