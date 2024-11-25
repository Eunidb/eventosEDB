// Esperar a que el contenido esté cargado
document.addEventListener("DOMContentLoaded", function() {

    // Registrar el Service Worker si es compatible
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service_worker.js')
            .then(registration => console.log("Service Worker registrado:", registration))
            .catch(error => console.error("Error al registrar el Service Worker:", error));
    }

    // Solicitar permiso para notificaciones
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Bienvenido al Gestor de Eventos!");
            }
        });
    }
    
    // Manejar el evento de instalación de la PWA
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      
        e.preventDefault();
        deferredPrompt = e;

       
        const installButton = document.createElement("button");
        installButton.textContent = "Instalar Aplicación";
        document.body.appendChild(installButton);
        
        installButton.addEventListener("click", () => {
          
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('El usuario aceptó la instalación');
                } else {
                    console.log('El usuario rechazó la instalación');
                }
                deferredPrompt = null;
                installButton.remove();
            });
        });
    });


    //Admin
    // Abre el modal al hacer clic en "Iniciar Sesión"
document.querySelector(".nav-menu a[href='#']").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("loginModal").style.display = "block";
});

// Cierra el modal al hacer clic en el botón de cerrar
document.querySelector(".close-btn").addEventListener("click", function () {
    document.getElementById("loginModal").style.display = "none";
});

// Cierra el modal al hacer clic fuera de él
window.addEventListener("click", function (event) {
    if (event.target == document.getElementById("loginModal")) {
        document.getElementById("loginModal").style.display = "none";
    }
});

// Manejador de envío del formulario (se puede conectar a Firebase más adelante)
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Aquí puedes agregar la lógica de autenticación con Firebase
    console.log("Correo:", email);
    console.log("Contraseña:", password);
    
    // Cierra el modal después del inicio de sesión
    document.getElementById("loginModal").style.display = "none";
});
// Manejador de envío del formulario (se puede conectar a Firebase más adelante)
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Aquí puedes agregar la lógica de autenticación con Firebase
    console.log("Correo:", email);
    console.log("Contraseña:", password);
    
    // Cierra el modal después del inicio de sesión
    document.getElementById("loginModal").style.display = "none";
    
    // Redirige a la página de CRUD después de iniciar sesión
    window.location.href = "./Admin/crudAdmin.html"; // Redirige a la página CRUD
});
});
