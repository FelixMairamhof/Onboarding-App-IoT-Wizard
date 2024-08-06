import React, { useState, useRef } from 'react';
import LogOut from './LogOut';
import { projects } from '../projects/projects';
import QrScanner from "./QrScanner";
import Photographer from './Photographer';
import Tesseract from 'tesseract.js';

export default function CerpStackPage({ updateToken }) {
  const [selectedProject, setSelectedProject] = useState('');
  const [seriesNumber, setSeriesNumber] = useState('');
  const [ocrResult, setOcrResult] = useState('');
  const fileInputRef = useRef(null);

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleSeriesNumberChange = (e) => {
    setSeriesNumber(e.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log("Uploaded file:", file);  // Debug log
    if (file) {
      Tesseract.recognize(
        file,
        'eng',
        {
          logger: (m) => console.log(m),
        }
      ).then(({ data: { text } }) => {
        setOcrResult(text.trim());
        setSeriesNumber(text.trim());
        console.log("OCR result:", text.trim());  // Debug log
      }).catch(err => {
        console.error('OCR Error:', err);
      });
    }
  };

  const handlePhotoTaken = (file) => {
    console.log("Photo taken file:", file);  // Debug log
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInputRef.current.files = dataTransfer.files;
    handleImageUpload({ target: { files: dataTransfer.files } });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Hello you on CerpStack Page</h1>

      <div className="mb-4">
        <label>Project:</label>
        <select value={selectedProject} onChange={handleProjectChange}>
          {projects.map((project) => (
            <option key={project.id} value={project.name}>{project.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label>Series Number:</label>
        <input type="text" value={seriesNumber} onChange={handleSeriesNumberChange} />
      </div>

      <div className="mb-4">
        <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
        <Photographer onPhotoTaken={handlePhotoTaken} />
      </div>

      <div className="mb-4">
      
      </div>

      <div className="mb-4">
        <button onClick={() => updateToken('')}>Logout</button>
      </div>

      <div className="mb-4">
        <label>OCR Result:</label>
        <textarea value={ocrResult} readOnly />
      </div>
    </div>
  );
}
