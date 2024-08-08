import React, { useState } from 'react';
import axios from 'axios';

const SensorProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    guide: '',
    qrResult: 'serialNumber', // Default value for radio buttons
    videoUrl: ''
  });
  const [resultMsg, setResultMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle radio button changes
  const handleRadioChange = (e) => {
    setFormData({ ...formData, qrResult: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:3000/api/sensor-profile', formData);
      console.log(response.data);
      setResultMsg(`Sensor profile (${response.data.name}) created successfully! `);
      setFormData({
        name: '',
        guide: '',
        qrResult: 'serialNumber',
        videoUrl: ''
      });
    } catch (error) {
      setResultMsg('Error creating sensor profile. Please try again.');
      console.error('Error submitting sensor profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full mt-8 mb-4 max-w-xs px-12 bg-gradient-to-b from-gray-600 to-gray-700 p-8 rounded-2xl shadow-2xl animate-fadeIn hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Create Sensor Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-300 text-sm mb-1">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter sensor profile name"
            value={formData.name}
            onChange={handleChange}
            required
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
            required
            className="w-full px-3 py-2 hover:scale-105 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-300 text-sm mb-1">QR Result</label>
          <div className="flex flex-col space-y-2">
            {['serialNumber', 'appKey', 'devEui', 'appEui'].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="qrResult"
                  value={option}
                  checked={formData.qrResult === option}
                  onChange={handleRadioChange}
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
            required
            className="w-full px-3 py-2 hover:scale-105 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 hover:scale-105 rounded-md shadow-md ${isSubmitting ? 'bg-gray-400' : 'bg-gray-500'} text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2`}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {resultMsg && <div className="mt-4 text-gray-300 text-center">{resultMsg}</div>}
    </div>
  );
};

export default SensorProfile;
