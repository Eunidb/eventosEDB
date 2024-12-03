import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8hk7_fsbcUrWvyTqic_qge1B9XdKp3uw",
  authDomain: "eventedb-8e316.firebaseapp.com",
  projectId: "eventedb-8e316",
  storageBucket: "eventedb-8e316.firebasestorage.app",
  messagingSenderId: "785738433526",
  appId: "1:785738433526:web:ded7988f4b36cd79f43dd7",
  measurementId: "G-H32J0X150P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Logout function
export function logout() {
  signOut(auth).then(() => {
    // Clear any stored user data
    localStorage.removeItem('userToken');
    // Redirect to login page
    window.location.href = '../index.html';
  }).catch((error) => {
    console.error('Logout error:', error);
    alert('Error al cerrar sesión');
  });
}

// Add event listener to logout button
document.getElementById('logoutBtn')?.addEventListener('click', logout);