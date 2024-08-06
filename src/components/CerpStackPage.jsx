import React, { useState } from 'react';
import LogOut from './LogOut';
import { projects } from '../projects/projects'; // Import the array of projects
import QrScanner from "./QrScanner";
import Photographer from './Photographer';
import Tesseract from 'tesseract.js';

export default function CerpStackPage({ updateToken }) {
  const [selectedProject, setSelectedProject] = useState('');
  const [seriesNumber, setSeriesNumber] = useState('');
  const [ocrResult, setOcrResult] = useState('');
  const [photoDataUri, setPhotoDataUri] = useState('');

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleSeriesNumberChange = (e) => {
    setSeriesNumber(e.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      Tesseract.recognize(
        file,
        'eng',
        {
          logger: (m) => console.log(m),
        }
      ).then(({ data: { text } }) => {
        setOcrResult(text.trim());
        setSeriesNumber(text.trim()); // Set the series number to the OCR result
      }).catch(err => {
        console.error('OCR Error:', err);
        // Optionally, display an error message to the user
      });
    }
  };

  const handlePhotoTaken = (dataUri) => {
    setPhotoDataUri(dataUri);
    console.log(dataUri);

    Tesseract.recognize(
      dataUri,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      setOcrResult(text.trim());
      setSeriesNumber(text.trim()); // Set the series number to the OCR result
    }).catch(err => {
      console.error('OCR Error:', err);
      // Optionally, display an error message to the user
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Hello you on CerpStack Page</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Project
        </label>
        <select
          value={selectedProject}
          onChange={handleProjectChange}
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Add Series Number
        </label>
        <input
          type="text"
          value={seriesNumber}
          onChange={handleSeriesNumberChange}
          className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter Series Number"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Or upload an image
        </label>
        <input
          type="file"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {ocrResult && <p className="mt-2 text-sm text-gray-500">OCR Result: {ocrResult}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Or scan a QR code
        </label>
        <QrScanner />
      </div>

      <Photographer onPhotoTaken={handlePhotoTaken} />

      <div className="flex justify-center">
        <LogOut user={null} updateToken={updateToken} />
      </div>
    </div>
  );
}
