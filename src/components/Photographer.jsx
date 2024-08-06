import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  facingMode: "environment",  // Default to back camera
  width: { ideal: 1280 },      // Set an ideal width
  height: { ideal: 720 }       // Set an ideal height
};

function Photographer({ onPhotoTaken }) {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log("Captured photo data URI:", imageSrc);  // Debug log

      if (imageSrc) {
        fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], 'captured_photo.jpg', { type: 'image/jpeg' });
            console.log("Created file:", file);  // Debug log
            onPhotoTaken(file);
          })
          .catch(err => console.error('Error fetching image:', err));  // Error handling
      } else {
        console.error("Failed to capture image. ImageSrc is null.");
      }
    } else {
      console.error("Webcam reference is null.");
    }
  }, [webcamRef, onPhotoTaken]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={(stream) => console.log("Webcam stream:", stream)}  // Debug log
        onUserMediaError={(error) => console.error("Webcam error:", error)}  // Error handling
      />
      <button onClick={capture}>Capture photo</button>
    </div>
  );
}

export default Photographer;
