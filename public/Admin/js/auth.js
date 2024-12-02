import { auth, db } from './firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';

async function login(email, password) {
  try {
    
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();

      if (userData.role === 'admin') {
        console.log("Inicio de sesión exitoso como administrador");
        document.getElementById("admin-login").style.display = "none";
        document.getElementById("admin-panel").style.display = "block";
        window.location.href = './public/Admin/crudAdmin.html';
      } else {
        console.error("Acceso denegado: No tienes permisos de administrador");
        alert("No tienes permisos para acceder a esta sección.");
        auth.signOut(); 
      }
    } else {
      console.error("El documento del usuario no existe en Firestore.");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    alert("Correo o contraseña incorrectos.");
  }
}


document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  login(email, password);
});
