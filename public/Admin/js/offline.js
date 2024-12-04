// Importaciones de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    updateDoc, 
    enableIndexedDbPersistence,
    onSnapshot,
    query
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Persistencia deshabilitada: múltiples pestañas abiertas');
    } else if (err.code === 'unimplemented') {
      console.warn('Persistencia no soportada en este navegador');
    }
  });

const COLECCION = "tablaEventos";

// Clase para manejar operaciones CRUD
class EventoCRUD {
    // Agregar nuevo evento
    static async agregarEvento(evento) {
        try {
            const docRef = await addDoc(collection(db, COLECCION), evento);
            console.log("Evento añadido con ID: ", docRef.id);
            return docRef.id;
        } catch (error) {
            console.error("Error al añadir evento: ", error);
            throw error;
        }
    }

    // Obtener todos los eventos
    static async obtenerEventos() {
        try {
            const querySnapshot = await getDocs(collection(db, COLECCION));
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error al obtener eventos: ", error);
            throw error;
        }
    }

    // Obtener un evento por ID
    static async obtenerEventoPorId(id) {
        try {
            const docRef = doc(db, COLECCION, id);
            const docSnap = await getDoc(docRef);
            
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            } else {
                console.log("No se encontró el evento");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener evento: ", error);
            throw error;
        }
    }

    // Actualizar evento
    static async actualizarEvento(id, nuevosDatos) {
        try {
            const docRef = doc(db, COLECCION, id);
            await updateDoc(docRef, nuevosDatos);
            console.log("Evento actualizado correctamente");
            return true;
        } catch (error) {
            console.error("Error al actualizar evento: ", error);
            throw error;
        }
    }

    // Eliminar evento
    static async eliminarEvento(id) {
        try {
            const docRef = doc(db, COLECCION, id);
            await deleteDoc(docRef);
            console.log("Evento eliminado correctamente");
            return true;
        } catch (error) {
            console.error("Error al eliminar evento: ", error);
            throw error;
        }
    }

    // Escuchar cambios en tiempo real
    static escucharEventos(callback) {
        const q = query(collection(db, COLECCION));
        return onSnapshot(q, (querySnapshot) => {
            const eventos = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            callback(eventos);
        }, (error) => {
            console.error("Error al escuchar eventos: ", error);
        });
    }
}

// Exportar la clase para usar en otros archivos
export default EventoCRUD;