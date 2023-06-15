<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import QrCodeReader from 'jsqr';

function App() {
  const [scanResultWebCam, setScanResultWebCam] = useState('');
=======
import React, { useState, useEffect, useRef } from 'react';
import QrReader from 'react-qr-scanner';
import firebase from './firebase';
import { db } from './firebase';
import './App.css';

function App() {
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const [userData, setUserData] = useState(null);
  const qrRef = useRef(null);

  useEffect(() => {
    if (scanResultWebCam) {
      fetchUserData(scanResultWebCam);
    }
  }, [scanResultWebCam]);

  useEffect(() => {
    selectBackCamera();
  }, []);
>>>>>>> 4148ae004fd762a490e05ba65cb355fd0509bcca

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

<<<<<<< HEAD
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
=======
  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result?.text || '');
    }
>>>>>>> 4148ae004fd762a490e05ba65cb355fd0509bcca
  };

  const selectBackCamera = () => {
    navigator.mediaDevices.enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const backCamera = videoDevices.find(device => device.label.toLowerCase().includes('back'));
        if (backCamera) {
          const constraints = {
            video: { deviceId: backCamera.deviceId },
          };
          qrRef.current.openImageDialog(); // Cerrar el diálogo de la cámara actual antes de cambiar a la cámara trasera
          qrRef.current.pause(); // Pausar la reproducción de video antes de cambiar a la cámara trasera
          qrRef.current.openVideoInputDevice(backCamera.deviceId, constraints); // Abrir la cámara trasera
        }
      })
      .catch(error => {
        console.log('Error al obtener los dispositivos de video:', error);
      });
  };

  return (
    <div>
      <h2>Kishop - Confirmar identidad</h2>
      <div className="qr-scanner">
        <h3>Escanear Código QR</h3>
<<<<<<< HEAD
=======
        <QrReader
          delay={300}
          style={{ width: '100%' }}
          onError={handleErrorWebCam}
          onScan={handleScanWebCam}
          ref={qrRef}
        />
>>>>>>> 4148ae004fd762a490e05ba65cb355fd0509bcca
        <h3>Resultado: {scanResultWebCam}</h3>
      </div>
    </div>
  );
}

export default App;
