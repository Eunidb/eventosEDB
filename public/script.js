document.addEventListener("DOMContentLoaded", function() {
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

    // Login Modal Handling
    const loginModalTrigger = document.querySelector(".nav-menu a[href='#']");
    const loginModal = document.getElementById("loginModal");
    const closeBtn = document.querySelector(".close-btn");

    if (loginModalTrigger) {
        loginModalTrigger.addEventListener("click", function (e) {
            e.preventDefault();
            loginModal.style.display = "block";
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            loginModal.style.display = "none";
        });
    }

    window.addEventListener("click", function (event) {
        if (event.target == loginModal) {
            loginModal.style.display = "none";
        }
    });

    // Login Form Submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            console.log("Correo:", email);
            console.log("Contraseña:", password);
            
            loginModal.style.display = "none";
            window.location.href = "./Admin/crudAdmin.html";
        });
    }
});