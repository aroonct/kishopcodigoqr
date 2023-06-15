import React, { useState, useEffect } from 'react';
import QrCodeReader from 'jsqr';

function App() {
  const [scanResultWebCam, setScanResultWebCam] = useState('');

  useEffect(() => {
    startQrCodeScanner();
  }, []);

  const startQrCodeScanner = () => {
    const constraints = { video: { facingMode: 'environment' } };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        const canvasElement = document.createElement('canvas');
        const canvas = canvasElement.getContext('2d');

        const scanQrCode = () => {
          canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
          const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
          const code = QrCodeReader(imageData.data, imageData.width, imageData.height);

          if (code) {
            setScanResultWebCam(code.data);
          }

          requestAnimationFrame(scanQrCode);
        };

        requestAnimationFrame(scanQrCode);
      })
      .catch((error) => {
        console.log('Error al acceder a la cámara:', error);
      });
  };

  return (
    <div>
      <h2>Kishop - Confirmar identidad</h2>
      <div className="qr-scanner">
        <h3>Escanear Código QR</h3>
        <h3>Resultado: {scanResultWebCam}</h3>
      </div>
    </div>
  );
}

export default App;
