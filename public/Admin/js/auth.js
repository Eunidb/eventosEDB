import { auth, db, signOut } from './firebaseConfig'; 
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
// Función para cerrar sesión
function logout() {
  signOut(auth).then(() => {
    // Cierre de sesión exitoso
    localStorage.removeItem('userToken'); // Eliminar token de usuario
    sessionStorage.removeItem('userSession'); // Eliminar sesión si la usas
    
    // Redirigir al index
    window.location.href = '../index.html'; 
  }).catch((error) => {
    // Manejar errores de cierre de sesión
    console.error('Error al cerrar sesión:', error);
    iziToast.error({
      title: 'Error',
      message: 'Hubo un problema al cerrar sesión',
      position: 'topRight'
    });
  });
}

// Añadir evento de clic al botón de logout cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logoutBtn');
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  }
});

// Exportar la función por si la necesitas en otro lugar
export { logout };