// src/components/ThingBoardPage.jsx
import React, { useState } from "react";

export default function ThingBoardPage({ setIsOnCerpStackPage, setIsOnInstructionPage,setIsOnThingBoardPage }) {
  const [name, setName] = useState('');
  const [floor, setFloor] = useState('');
  const [building, setBuilding] = useState('');
  const [room, setRoom] = useState(''); // New state for room
  const [selectedApplication, setSelectedApplication] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const applications = ["App1", "App2", "App3"]; // Example applications

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !floor || !building || !room || !selectedApplication) {
      setErrorMessage('Bitte füllen Sie alle Felder aus und wählen Sie eine Anwendung aus.');
      return;
    }

    // Handle form submission logic here
    console.log("Formular übermittelt mit Daten:", { name, floor, building, room, selectedApplication });

    // Call the callback function to switch pages
    setIsOnCerpStackPage(true);
    setIsOnInstructionPage(false);
    setIsOnThingBoardPage(false);
  };

  return (
    <div className="p-6 m-4 rounded-2xl bg-gradient-to-b from-gray-600 to-gray-700 text-gray-200 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">ThingsBoard Formular</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Anwendung</label>
          <select
            value={selectedApplication}
            onChange={(e) => setSelectedApplication(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
            required
            
          >
            <option value="" disabled>Wählen Sie eine Anwendung</option>
            {applications.map((app, index) => (
              <option key={index} value={app}>
                {app}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
            placeholder="Name eingeben"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Gebäude</label>
          <input
            type="text"
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
            placeholder="Gebäude eingeben"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Stockwerk</label>
          <input
            type="text"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
            placeholder="Stockwerk eingeben"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Raum</label> 
          <input
            type="text"
            value={room}
            required
            onChange={(e) => setRoom(e.target.value)}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-transform transform hover:scale-105"
            placeholder="Raum eingeben" 
            
          />
        </div>

        {errorMessage && (
          <div className="mb-4 p-2 text-red-600  rounded-md">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full p-2 shadow-2xl bg-gray-800 text-white rounded-2xl hover:bg-gray-700 focus:outline-none ring-2 ring-gray-500 transition-transform transform hover:scale-105"
        >
          Absenden
        </button>
        <button
          type="submit"
          onClick={() => {
            setIsOnCerpStackPage(false);
            setIsOnInstructionPage(true);
            setIsOnThingBoardPage(false);
          }}
          className="w-full p-2 shadow-2xl bg-gray-800 text-white rounded-2xl hover:bg-gray-700 focus:outline-none ring-2 ring-gray-500 transition-transform transform hover:scale-105"
        >
          Zurück
        </button>
      </form>
    </div>
  );
}
