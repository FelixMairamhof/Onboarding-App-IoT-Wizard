// src/components/InstructionPage.jsx
import React from 'react';

export default function InstructionPage({ activeSensorProfile, setIsOnInstructionPage, setIsOnThingBoardPage }) {
  const handleNext = () => {
    setIsOnInstructionPage(false);
    setIsOnThingBoardPage(true);
  };

  return (
    <div className="p-6 m-4 rounded-2xl bg-gradient-to-b from-gray-600 to-gray-700 text-gray-200 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Anleitung für {activeSensorProfile.name}</h1>
      <p>{activeSensorProfile.guide}</p>
      <video src={activeSensorProfile.video_url} controls className="my-4 w-full rounded-lg shadow-lg"></video>
      <button
        onClick={handleNext}
        className="w-full p-2 shadow-2xl bg-gray-800 text-white rounded-2xl hover:bg-gray-700 focus:outline-none ring-2 ring-gray-500 transition-transform transform hover:scale-105"
      >
        Weiter zu ThingBoard
      </button>
      <button
        onClick={() => {
          setIsOnInstructionPage(false);
          // Handle back navigation if needed
        }}
        className="w-full p-2 mt-4 shadow-2xl bg-gray-800 text-white rounded-2xl hover:bg-gray-700 focus:outline-none ring-2 ring-gray-500 transition-transform transform hover:scale-105"
      >
        Zurück zur Sensor-Auswahl
      </button>
    </div>
  );
}
