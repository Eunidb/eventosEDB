// Importa Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDoc, getDocs, deleteDoc, doc, updateDoc, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA8hk7_fsbcUrWvyTqic_qge1B9XdKp3uw",
  authDomain: "eventedb-8e316.firebaseapp.com",
  projectId: "eventedb-8e316",
  storageBucket: "eventedb-8e316.firebasestorage.app",
  messagingSenderId: "785738433526",
  appId: "1:785738433526:web:ded7988f4b36cd79f43dd7",
  measurementId: "G-H32J0X150P"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Habilitar persistencia offline
enableIndexedDbPersistence(db)
  .catch((error) => {
    if (error.code === "failed-precondition") {
      console.warn("Persistencia no habilitada. Varias pestañas abiertas.");
    } else if (error.code === "unimplemented") {
      console.warn("Persistencia no soportada en este navegador.");
    }
  });

const coleccion = "tablaEventos"; // Cambio de colección para eventos

// Esta función agrega un nuevo evento a una colección en Firestore, con los detalles proporcionados como artista, nombre, fecha, hora, y ubicación.
export const addEvento = (artista, nombre, fecha, hora, ubicacion) =>
  addDoc(collection(db, coleccion), { artista, nombre, fecha, hora, ubicacion });

// Esta función obtiene todos los documentos de una colección de eventos en Firestore y devuelve una promesa que se resuelve con los datos de esos documentos.
export const getEventosCollection = () => getDocs(collection(db, coleccion));

// Esta función obtiene un documento específico de una colección de eventos en Firestore utilizando su ID como referencia y devuelve una promesa que se resuelve con los datos del documento.
export const getEventoCollection = (id) => {
  const docRef = doc(db, coleccion, id);
  return getDoc(docRef);
};

// Esta función actualiza un documento específico en una colección de eventos en Firestore con los nuevos campos proporcionados, utilizando el ID del documento como referencia.
export const updateEventoCollection = (id, newFields) =>
  updateDoc(doc(db, coleccion, id), newFields);

// Esta función elimina un documento específico de una colección de eventos en Firestore utilizando su ID como referencia.
export const deleteEventoCollection = (id) => deleteDoc(doc(db, coleccion, id));

export { db };