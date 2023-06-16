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

  const fetchUserData = async (userId) => {
    try {
      const userRef = db.collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserData(userData);
      } else {
        console.log('El usuario no existe');
      }
    } catch (error) {
      console.log('Error al obtener los datos del usuario:', error);
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = (result) => {
    if (result) {
      setScanResultWebCam(result?.text || '');
    }
  };

  const selectBackCamera = () => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        const backCamera = videoDevices.find((device) => device.label.toLowerCase().includes('back'));
        if (backCamera) {
          const constraints = {
            video: { deviceId: backCamera.deviceId },
          };
          qrRef.current.openImageDialog(); // Cerrar el diálogo de la cámara actual antes de cambiar a la cámara trasera
          qrRef.current.pause(); // Pausar la reproducción de video antes de cambiar a la cámara trasera
          qrRef.current.openVideoInputDevice(backCamera.deviceId, constraints); // Abrir la cámara trasera
        }
      })
      .catch((error) => {
        console.log('Error al obtener los dispositivos de video:', error);
      });
  };

  const handleEnableUser = () => {
    if (userData) {
      const userRef = db.collection('users').doc(scanResultWebCam);
      userRef.update({ estado: 'habilitado' })
        .then(() => {
          console.log('Usuario habilitado');
          setUserData({ ...userData, estado: 'habilitado' });
        })
        .catch((error) => {
          console.log('Error al habilitar usuario:', error);
        });
    }
  };

  const handleDisableUser = () => {
    if (userData) {
      const userRef = db.collection('users').doc(scanResultWebCam);
      userRef.update({ estado: 'deshabilitado' })
        .then(() => {
          console.log('Usuario deshabilitado');
          setUserData({ ...userData, estado: 'deshabilitado' });
        })
        .catch((error) => {
          console.log('Error al deshabilitar usuario:', error);
        });
    }
  };

  return (
    <div className="container">
      <h2>Kishop - Confirmar identidad</h2>
      <div className="qr-scanner">
        <h3>Escanear Código QR</h3>
        <QrReader
          delay={300}
          style={{ width: '100%' }}
          onError={handleErrorWebCam}
          onScan={handleScanWebCam}
          ref={qrRef}
        />
        <h3>Resultado: {scanResultWebCam}</h3>
        {userData && (
          <div className="user-data">
            <img className="profile-image" src={userData.imageUrl} alt="Imagen de perfil" />
            <p>DNI: {userData.dni}</p>
            <p>Nombre: {userData.nombre}</p>
            <p>Apellido: {userData.apellido}</p>
            <p>Cargo: {userData.cargo}</p>
            <p>Correo: {userData.correo}</p>
            <p>Función: {userData.funcion}</p>
            <p>Código de Seguridad: ******</p>
            <p>Estado: {userData.estado}</p>
            <button className='btnhb hab' onClick={handleEnableUser}>Habilitar</button>
            <button className='btnhb desh' onClick={handleDisableUser}>Deshabilitar</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
