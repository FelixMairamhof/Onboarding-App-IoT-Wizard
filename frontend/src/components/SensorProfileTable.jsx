import React from 'react';
import useProfileStore from '../zustand/sensorProfileZustand';

const SensorProfileTable = () => {
  const { profiles } = useProfileStore(state => ({
    profiles: state.profiles,
  }));

  return (
    <div className="w-full mt-8 mb-4 px-8 bg-gradient-to-b from-gray-600 to-gray-700 p-8 rounded-2xl shadow-2xl animate-fadeIn hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Sensor Profile Overview</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-md shadow-md">
          <thead>
            <tr className="bg-gray-700 text-gray-200">
              <th className="px-4 py-2 border-b border-gray-600">Name</th>
              <th className="px-4 py-2 border-b border-gray-600">Guide</th>
              <th className="px-4 py-2 border-b border-gray-600">QR Result</th>
              <th className="px-4 py-2 border-b border-gray-600">Video URL</th>
            </tr>
          </thead>
          <tbody>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <tr key={profile.name} className="hover:bg-gray-700 transition-transform duration-300 ease-in-out">
                  <td className="px-4 py-2 border-b border-gray-600">{profile.name}</td>
                  <td className="px-4 py-2 border-b border-gray-600">{profile.guide}</td>
                  <td className="px-4 py-2 border-b border-gray-600">{profile.qr_result}</td>
                  <td className="px-4 py-2 border-b border-gray-600">{profile.video_url}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-400">No profiles available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorProfileTable;
