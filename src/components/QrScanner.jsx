import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const QrScanner = ({ onScan }) => { // Added onScan prop
  const [data, setData] = useState('No result');
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    codeReader
      .decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          setData(result.getText());
          if (onScan) onScan(result.getText()); // Call the onScan callback
        }
        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      codeReader.reset();
    };
  }, [onScan]);

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} />
      <p>{data}</p>
    </div>
  );
};

export default QrScanner;
