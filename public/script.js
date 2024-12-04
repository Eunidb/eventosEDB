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

// Inicializa IndexedDB
const dbName = "GestorEventosDB";
let db;

function initDB() {
  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains("eventos")) {
      const store = db.createObjectStore("eventos", { keyPath: "id", autoIncrement: true });
      store.createIndex("artista", "artista", { unique: false });
      store.createIndex("nombreEvento", "nombreEvento", { unique: false });
    }
    console.log("IndexedDB configurada.");
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("IndexedDB inicializada.");
  };

  request.onerror = (event) => {
    console.error("Error al abrir IndexedDB:", event.target.error);
  };
}

// Agregar un nuevo evento
function agregarEvento(evento) {
  const transaction = db.transaction(["eventos"], "readwrite");
  const store = transaction.objectStore("eventos");
  store.add(evento);

  transaction.oncomplete = () => {
    console.log("Evento agregado con éxito:", evento);
  };

  transaction.onerror = (event) => {
    console.error("Error al agregar evento:", event.target.error);
  };
}

// Obtener todos los eventos
function obtenerEventos(callback) {
  const transaction = db.transaction(["eventos"], "readonly");
  const store = transaction.objectStore("eventos");
  const request = store.getAll();

  request.onsuccess = () => {
    callback(request.result);
  };

  request.onerror = (event) => {
    console.error("Error al obtener eventos:", event.target.error);
  };
}

// Eliminar un evento por ID
function eliminarEvento(id) {
  const transaction = db.transaction(["eventos"], "readwrite");
  const store = transaction.objectStore("eventos");
  store.delete(id);

  transaction.oncomplete = () => {
    console.log(`Evento con ID ${id} eliminado con éxito.`);
  };

  transaction.onerror = (event) => {
    console.error("Error al eliminar evento:", event.target.error);
  };
}

// Actualizar un evento
function actualizarEvento(evento) {
  const transaction = db.transaction(["eventos"], "readwrite");
  const store = transaction.objectStore("eventos");
  store.put(evento);

  transaction.oncomplete = () => {
    console.log("Evento actualizado:", evento);
  };

  transaction.onerror = (event) => {
    console.error("Error al actualizar evento:", event.target.error);
  };
}

// Inicializa la base de datos al cargar la página
initDB();
