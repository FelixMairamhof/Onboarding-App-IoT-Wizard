import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function Photographer({ onPhotoTaken }) {
  function handleTakePhoto(dataUri) {
    onPhotoTaken(dataUri); // Pass the photo data URI to the parent
  }

  return (
    <Camera
      onTakePhoto={handleTakePhoto}
      idealFacingMode="environment"
      isFullscreen={true}
    />
  );
}

export default Photographer;
