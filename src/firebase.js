
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // Importar Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyAMdFl4mYwCVgIm3G_bxulbuY03B0KCFvI",
  authDomain: "kishop-d85dc.firebaseapp.com",
  databaseURL: "https://kishop-d85dc-default-rtdb.firebaseio.com",
  projectId: "kishop-d85dc",
  storageBucket: "kishop-d85dc.appspot.com",
  messagingSenderId: "699663015371",
  appId: "1:699663015371:web:db045e4e8e5473b63eaa4e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage(); // Configurar Firebase Storage

export default firebase;
export { db, storage }; // Exportar el objeto storage