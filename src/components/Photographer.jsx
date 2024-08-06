import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function Photographer({ onPhotoTaken }) {
  function handleTakePhoto(dataUri) {
    onPhotoTaken(dataUri); // Pass the photo data URI to the parent
  }

  function handleCameraError(error) {
    console.error('Camera error:', error);
    alert('There was an issue accessing the camera. Please ensure camera permissions are granted and no other application is using the camera.');
  }

  return (
    <Camera
      onTakePhoto={handleTakePhoto}
      onCameraError={handleCameraError} // Add error handling callback
    />
  );
}

export default Photographer;
