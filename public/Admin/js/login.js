// Obtener el modal, botón y el ícono de cierre
const loginModal = document.getElementById("loginModal");
const loginBtn = document.getElementById("loginBtn");
const closeBtn = document.querySelector(".close-btn");

// Mostrar el modal cuando se hace clic en el botón de inicio de sesión
loginBtn.addEventListener("click", function(event) {
    event.preventDefault(); // Evita que se recargue la página
    loginModal.style.display = "block";
});

// Cerrar el modal cuando se hace clic en la "X"
closeBtn.addEventListener("click", function() {
    loginModal.style.display = "none";
});

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener("click", function(event) {
    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }
});
