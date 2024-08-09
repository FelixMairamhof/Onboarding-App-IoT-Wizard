import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateSensorProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    newName: '',
    guide: '',
    qrResult: '',
    videoUrl: ''
  });
  const [resultMsg, setResultMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch existing sensor profiles
    axios.get("http://localhost:3000/api/sensor-profile")
      .then(response => {
        if (Array.isArray(response.data)) {
          setProfiles(response.data);
        } else {
          console.error('Unexpected response data format:', response.data);
          setErrorMsg('Error fetching sensor profiles.');
        }
      })
      .catch(error => {
        if (error.response) {
          console.error('API error response:', error.response.data);
          setErrorMsg(`Error: ${error.response.data.message || 'An error occurred'}`);
        } else {
          console.error('Error:', error.message);
          setErrorMsg('Error fetching sensor profiles.');
        }
      });
  }, []);

  useEffect(() => {
    // Auto-fill form when a profile is selected
    const selectedProfile = profiles.find(profile => profile.name === formData.name);
    if (selectedProfile) {
      setFormData({
        name: selectedProfile.name,
        newName: selectedProfile.name || '',
        guide: selectedProfile.guide || '',
        qrResult: selectedProfile.qr_result || '',
        videoUrl: selectedProfile.video_url || ''
      });
    }
  }, [formData.name, profiles]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResultMsg('');
    setErrorMsg('');

    try {
      const response = await axios.put("http://localhost:3000/api/sensor-profile", formData);
      setResultMsg(`Sensor profile (${response.data.name}) updated successfully!`);
      
      // Update local state
      setProfiles(profiles.map(profile => 
        profile.name === formData.name ? response.data : profile
      ));

      // Clear form data
      setFormData({
        name: '',
        newName: '',
        guide: '',
        qrResult: '',
        videoUrl: ''
      });
    } catch (error) {
      setErrorMsg('Error updating sensor profile. Please try again.');
      console.error('Error updating sensor profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-8 mb-4 max-w-xs px-12 bg-gradient-to-b from-gray-600 to-gray-700 p-8 rounded-2xl shadow-2xl animate-fadeIn hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Update Sensor Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="profileName" className="text-gray-300 text-sm mb-1">Select Profile</label>
          <select
            id="profileName"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-3 py-2 hover:scale-105 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          >
            <option value="">Select Profile</option>
            {profiles.map(profile => (
              <option key={profile.name} value={profile.name}>
                {profile.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="newName" className="text-gray-300 text-sm mb-1">New Name (optional)</label>
          <input
            id="newName"
            type="text"
            name="newName"
            placeholder="Enter new profile name"
            value={formData.newName}
            onChange={handleChange}
            className="w-full px-3 py-2 hover:scale-105 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="guide" className="text-gray-300 text-sm mb-1">Guide</label>
          <textarea
            id="guide"
            name="guide"
            placeholder="Enter guide text"
            value={formData.guide}
            onChange={handleChange}
            className="w-full px-3 py-2 hover:scale-105 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-300 text-sm mb-1">QR Result</label>
          <div className="flex flex-col space-y-2">
            {['serial_number', 'app_key', 'dev_eui', 'app_eui'].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="qrResult"
                  value={option}
                  checked={formData.qrResult === option}
                  onChange={handleChange}
                  className="hidden peer"
                />
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className={`w-5 h-5 rounded-full border-2 border-gray-500 peer-checked:border-blue-500 flex items-center justify-center ${formData.qrResult === option ? 'bg-gray-700' : 'bg-gray-700'}`}>
                    {formData.qrResult === option && (
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    )}
                  </div>
                  <span className="text-gray-300">{option.replace(/([A-Z])/g, ' $1')}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="videoUrl" className="text-gray-300 text-sm mb-1">Video URL</label>
          <input
            id="videoUrl"
            type="text"
            name="videoUrl"
            placeholder="Enter video URL"
            value={formData.videoUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 hover:scale-105 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md shadow-md ${isSubmitting ? 'bg-gray-400' : 'bg-gray-500'} text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-transform duration-300 ease-in-out`}
        >
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      {resultMsg && <div className="mt-4 text-gray-300 text-center">{resultMsg}</div>}
      {errorMsg && <div className="mt-4 text-red-400 text-center">{errorMsg}</div>}
    </div>
  );
};

export default UpdateSensorProfile;
