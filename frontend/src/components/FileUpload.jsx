import React, { useState } from "react";
import { processFileData } from "../utils/fileUtils";
import useSensorDataStore from '../zustand/sensorDataZustand';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const [columnNames, setColumnNames] = useState({
    serialNumber: "",
    devEui: "",
    appEui: "",
    appKey: "",
  });

  const { addSensorData, fetchSensorData } = useSensorDataStore((state) => ({
    addSensorData: state.addSensorData,
    fetchSensorData: state.fetchSensorData,
  }));

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setColumnNames({ ...columnNames, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const result = await processFileData(file, columnNames);
        if (result.type === 'success') {
          await addSensorData(result.data);  // Add data to Zustand store
          await fetchSensorData(); // Refresh the data
        }
        setResultMsg(result.message);
      } catch (error) {
        setResultMsg("An error occurred during file processing.");
      } finally {
        setFile(null);
        setColumnNames({
          serialNumber: "",
          devEui: "",
          appEui: "",
          appKey: "",
        });
        document.getElementById('file-input').value = '';
      }
    } else {
      setResultMsg("No file selected.");
    }
  };

  return (
    <div className="w-full mt-8 mb-4 max-w-xs px-12 bg-gradient-to-b from-gray-600 to-gray-700 p-8 rounded-2xl shadow-2xl animate-fadeIn hover:-translate-y-2 transition-transform duration-300 ease-in-out">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">Spreadsheet</h1>
      <div
        className={`flex flex-col bg-gray-200 hover:scale-105 border-2 border-dashed border-gray-500 items-center justify-center w-full h-24 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out ${
          isDragging ? "border-gray-400 scale-105" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          accept=".csv, .xls, .xlsx"
          onChange={handleFileChange}
          className="hidden"
          id="file-input"
        />
        <label htmlFor="file-input" className="text-gray-400 text-sm text-center cursor-pointer">
          Drag & drop a file here, <br /> or click to select a file
        </label>
      </div>
      {file && <div className="mt-4 text-gray-300">Selected file: {file.name}</div>}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        {Object.keys(columnNames).map((key) => (
          <div className="flex flex-col" key={key}>
            <label htmlFor={key} className="text-gray-300 text-sm mb-1 capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              id={key}
              type="text"
              name={key}
              required
              placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
              value={columnNames[key]}
              onChange={handleInputChange}
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

export default FileUpload;
