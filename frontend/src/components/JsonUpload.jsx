import React, { useState } from 'react';
import { processJsonData } from '../utils/fileUtils';

const JsonUpload = () => {
  const [file, setFile] = useState(null);
  const [resultMsg, setResultMsg] = useState('');
  const [keys, setKeys] = useState({
    serialNumber: '',
    devEui: '',
    appEui: '',
    appKey: '',
  });

  // Handle file selection through the file input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle input changes
  const handleKeyChange = (e) => {
    const { name, value } = e.target;
    setKeys({ ...keys, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const result = await processJsonData(file, keys);
        setResultMsg(result.message);
      } catch (error) {
        setResultMsg(error.message || 'An error occurred during file processing.');
      } finally {
        // Reset states after processing
        setFile(null);
        setKeys({
          serialNumber: '',
          devEui: '',
          appEui: '',
          appKey: '',
        });
      }
    } else {
      setResultMsg('No file selected.');
    }
  };

  return (
    <div className="w-full mt-8 mb-4 max-w-xs px-12 bg-gradient-to-b from-gray-600 to-gray-700 p-8 rounded-2xl shadow-2xl animate-fadeIn hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">JSON Upload</h1>
      <div
        className="flex flex-col bg-gray-200 hover:scale-105 border-2 border-dashed border-gray-500 items-center justify-center w-full h-24 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out"
      >
        <input
          type="file"
          accept='.json'
          onChange={handleFileChange}
          className="hidden"
          id="json-file-input"
          key={file ? file.name : 'reset'} // This key prop will reset the input when file is cleared
        />
        <label htmlFor="json-file-input" className="text-gray-400 text-sm text-center cursor-pointer">
          Drag & drop a JSON file here, <br /> or click to select a file
        </label>
      </div>
      {file && <div className="mt-4 text-gray-300">Selected file: {file.name}</div>}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {Object.keys(keys).map((key) => (
          <div className="flex flex-col" key={key}>
            <label htmlFor={key} className="text-gray-300 text-sm mb-1 capitalize">
              {key}
            </label>
            <input
              id={key}
              type="text"
              name={key}
              placeholder={`Enter ${key}`}
              value={keys[key]}
              onChange={handleKeyChange}
              className="w-full hover:scale-105 px-3 py-2 bg-gray-200 border border-gray-500 rounded-md shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
            />
          </div>
        ))}
        <button
          type="submit"
          className="w-full hover:scale-105 bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          Upload
        </button>
      </form>
      {resultMsg && <div className="mt-4 text-gray-300 text-center">{resultMsg}</div>}
    </div>
  );
};

export default JsonUpload;
