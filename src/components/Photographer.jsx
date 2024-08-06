import React from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

function Photographer({ onPhotoTaken }) {
  function handleTakePhoto(dataUri) {
    onPhotoTaken(dataUri); // Pass the photo data URI to the parent
  }

  return (
    <Camera
      onTakePhoto={handleTakePhoto}
      idealFacingMode={FACING_MODES.ENVIRONMENT}
      
    />
  );
}

export default Photographer;
