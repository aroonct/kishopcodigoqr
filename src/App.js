import React, { useState, useRef } from 'react';
import QrReader from 'react-qr-scanner';
import firebase from './firebase';
import { db } from './firebase';
import './App.css';

function App() {
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const [userData, setUserData] = useState(null);
  const qrRef = useRef(null);
  const [qrKey, setQrKey] = useState(0); // Clave dinámica para reinicializar el componente QrReader

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
      fetchUserData(result?.text || '');
      setQrKey(prevKey => prevKey + 1); // Actualizar la clave para reinicializar el componente QrReader
    }
  };

  return (
    <div className="container">
      <h2>Kishop - Confirmar identidad</h2>
      <div className="qr-scanner">
        <h3>Escanear Código QR</h3>
        <QrReader
          key={qrKey} // Clave dinámica para reinicializar el componente QrReader
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
            <p>Código de Seguridad: {userData.codigoseguridad}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
