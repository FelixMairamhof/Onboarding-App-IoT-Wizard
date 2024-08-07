import React, { useState, useRef, useEffect } from 'react';

export default function CameraComponent() {
  const [isCameraAvailable, setIsCameraAvailable] = useState(true);
  const [data, setData] = useState(''); // This would be updated with camera data
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } catch (error) {
        console.error('Error accessing the camera:', error);
        setIsCameraAvailable(false); // Set to false if there's an error
      }
    };

    startCamera();
  }, []);

  return (
    <div className="animate-fadeIn shadow-2xl rounded-xl">
      {isCameraAvailable ? (
        <>
          <video ref={videoRef} className=" mt-2 shadow-2xl rounded-xl  animate-fadeInLong" />
          <h1 className="text-center mt-4">{data}</h1>
        </>
      ) : (
        <div className="text-center">
          <img
            src="./crossedCamera.png" // Replace with the path to your fallback image
            alt="Fallback"
            className=" scale-50  mt-2 filter invert opacity-70"
          />
          <h1 className="text-center pb-8">Kamerazugriff nicht verfügbar</h1>
        </div>
      )}
    </div>
  );
}
