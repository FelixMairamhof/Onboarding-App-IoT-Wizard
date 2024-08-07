import React, { useState, useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const QrScanner = React.memo(({ onScan }) => {
  const [data, setData] = useState('Noch kein Qr-Code erkannt');
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanner = async () => {
      try {
        await codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
          if (result) {
            setData("Result: " + result.getText());
            if (onScan) onScan(result.getText()); // Call the onScan callback
          }
          if (err && !(err instanceof NotFoundException)) {
            console.error(err);
          }
        });
      } catch (err) {
        console.error(err);
      }
    };

    startScanner();

    return () => {
      codeReader.reset();
    };
  }, [onScan]); // Dependencies are important to avoid unnecessary reinitialization

  return (
    <div className="animate-fadeIn">
      <video ref={videoRef} className='rounded-2xl mt-2 shadow-2xl animate-fadeInLong' />
      <h1 className='text-center mt-4'>{data}</h1>
    </div>
  );
});

export default QrScanner;
