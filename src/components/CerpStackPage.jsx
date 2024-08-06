import React, { useState } from 'react';
import LogOut from './LogOut';
import { projects } from '../projects/projects';
import QrScanner from './QrScanner'; // Import QrScanner
import Photographer from './Photographer';
import Tesseract from 'tesseract.js';

export default function CerpStackPage({ updateToken }) {
  const [selectedProject, setSelectedProject] = useState('');
  const [seriesNumber, setSeriesNumber] = useState('');
  const [ocrResult, setOcrResult] = useState('');
  const [photoDataUri, setPhotoDataUri] = useState('');
  const [isPhotoMode, setIsPhotoMode] = useState(false);

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleSeriesNumberChange = (e) => {
    setSeriesNumber(e.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Tesseract.recognize(
        file,
        'eng',
        { logger: (m) => console.log(m) }
      ).then(({ data: { text } }) => {
        setOcrResult(text.trim());
        setSeriesNumber(text.trim());
      }).catch(err => {
        console.error('OCR Error:', err);
      });
    }
  };

  const handlePhotoTaken = (dataUri) => {
    setPhotoDataUri(dataUri);
    Tesseract.recognize(
      dataUri,
      'eng',
      { logger: (m) => console.log(m) }
    ).then(({ data: { text } }) => {
      setOcrResult(text.trim());
      setSeriesNumber(text.trim());
    }).catch(err => {
      console.error('OCR Error:', err);
    });
  };

  const handleQrScan = (text) => {
    setSeriesNumber(text); // Update seriesNumber with QR scan result
  };

  return (
    <div className="p-6 m-4 rounded-2xl bg-gradient-to-b from-gray-600 to-gray-700 min-h-screen text-gray-200">
      <h1 className="text-3xl font-bold mb-6">Neuer Sensor</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Select Project
        </label>
        <select
          value={selectedProject}
          onChange={handleProjectChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <option value="" disabled>
            Choose a project
          </option>
          {projects.map((project, index) => (
            <option key={index} value={project}>
              {project}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Add Series Number
        </label>
        <input
          type="text"
          value={seriesNumber}
          onChange={handleSeriesNumberChange}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          placeholder="Enter Series Number"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Or upload an image
        </label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {ocrResult && <p className="mt-2 text-sm">OCR Result: {ocrResult}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">
          Or scan a QR code
        </label>
        {!isPhotoMode && <QrScanner onScan={handleQrScan} />}
      </div>

      <div className="mb-6">
        <button
          onClick={() => setIsPhotoMode(!isPhotoMode)}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          {isPhotoMode ? 'Switch to QR Scanner' : 'Switch to Photographer'}
        </button>
      </div>

      {isPhotoMode && <Photographer onPhotoTaken={handlePhotoTaken} />}

      <div className="flex justify-center mt-6">
        <LogOut user={null} updateToken={updateToken} />
      </div>
    </div>
  );
}
