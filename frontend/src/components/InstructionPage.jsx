import React, { useEffect } from 'react';

export default function InstructionPage({ activeSensorProfile, setIsOnCerpStackPage, setIsOnInstructionPage, setIsOnThingBoardPage }) {
  const handleNext = () => {
    setIsOnInstructionPage(false);
    setIsOnThingBoardPage(true);
  };

  useEffect(() => {
    const guideList = activeSensorProfile.guide.split(".");
    // Any additional logic related to guideList can be added here
  }, [activeSensorProfile]);

  const guideList = activeSensorProfile.guide.split(".");
  
  return (
    <div className="p-6 m-4 rounded-2xl bg-gradient-to-b from-gray-600 to-gray-700 text-gray-200 animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">Anleitung für {activeSensorProfile.name}</h1>
      <ul className="list-disc ml-5 mb-4">
        {guideList.map((guide, key) => (
          <li className='text-gray-300' key={key}>
            {guide}
          </li>
        ))}
      </ul>

    {activeSensorProfile.video_url && <div className="my-4 w-full rounded-lg shadow-lg">
        <iframe 
          width="100%" 
          height="315" 
          src={`https://www.youtube.com/embed/${getYouTubeID(activeSensorProfile.video_url)}`} 
          title="YouTube video player"  
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
          className="rounded-lg"
        ></iframe>
      </div>}

      <button
        onClick={handleNext}
        className="w-full p-2 shadow-2xl bg-gray-800 text-white rounded-2xl hover:bg-gray-700 focus:outline-none ring-2 ring-gray-500 transition-transform transform hover:scale-105"
      >
        Weiter zu ThingBoard
      </button>
      <button
        onClick={() => {
          setIsOnInstructionPage(false);
          setIsOnCerpStackPage(true);
        }}
        className="w-full p-2 mt-4 shadow-2xl bg-gray-800 text-white rounded-2xl hover:bg-gray-700 focus:outline-none ring-2 ring-gray-500 transition-transform transform hover:scale-105"
      >
        Zurück zur Sensor-Auswahl
      </button>
    </div>
  );
}

// Helper function to extract the YouTube video ID from the URL
function getYouTubeID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}
