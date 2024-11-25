import {
  addEvento,
  getEventosCollection,
  deleteEventoCollection,
  getEventoCollection,
  updateEventoCollection,
} from "./firebaseConfig.js";

/**
 * Función para levantar Evento Modal
 */
console.log("Archivo modificaciones.js cargado correctamente");
window.miModal = async function (idModal, idEvento = "") {
  try {
    await validarModal(idModal);

    let url = "";
    switch (idModal) {
      case "agregarEventoModal":
        url = "../Admin/modales/modalAdd.php";
        break;
      case "detalleEventoModal":
        url = "../Admin/modales/modalDetalles.php";
        break;
      case "editarEventoModal":
        url = "../Admin/modales/modalEditar.php";
        break;
      case "eliminarEventoModal":
        url = "../Admin/modales/modalDelete.php";
        break;
      default:
        throw new Error(`El idModal '${idModal}' no es válido`);
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al cargar la modal");
    }

    const data = await response.text();

    // Crear un elemento div para almacenar el contenido de la modal
    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = data;

    // Agregar la modal al documento actual
    document.body.appendChild(modalContainer);

    // Mostrar la modal
    const modalElement = modalContainer.querySelector(`#${idModal}`);
    const myModal = new bootstrap.Modal(modalElement);
    myModal.show();

    if (idModal === "detalleEventoModal") {
      await cargarDetalleEvento(idEvento);
    } else if (idModal === "editarEventoModal") {
      await getEventoUpdateCollection(idEvento);
    } else if (idModal === "eliminarEventoModal") {
      let DeleteBtn = document.querySelector("#confirmDeleteBtn");
      DeleteBtn.addEventListener("click", async () => {
        await eliminarEvento(idEvento);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

//Función para validar si existe una modal abierta
async function validarModal(idModal) {
  const existingModal = document.getElementById(idModal);
  if (existingModal) {
    const modal = bootstrap.Modal.getInstance(existingModal);
    if (modal) {
      modal.hide();
    }
    existingModal.remove();
  }
}

/**
 * Función para obtener todas las colecciones
 */
async function mostrarEventosEnHTML() {
  try {
    const eventosCollection = getEventosCollection();
    const queryCollection = await eventosCollection;

    const tablaEventos = document.querySelector("#tablaEventos tbody");
    tablaEventos.innerHTML = "";

    queryCollection.forEach((doc) => {
      const evento = doc.data();
      const fila = document.createElement("tr");
      fila.id = doc.id; // Asignar el ID del documento al elemento tr
      fila.innerHTML = `
        <td>${evento.artista}</td>
        <td>${evento.nombre}</td>
        <td>${evento.fecha}</td>
        <td>${evento.hora}</td>
        <td>${evento.ubicacion}</td>
        <td>
          <a title="Ver detalles del evento" href="#" onclick="window.miModal('detalleEventoModal','${doc.id}')" class="btn btn-success">
              <i class="bi bi-binoculars"></i>
          </a>
          <a title="Editar datos del evento" href="#" onclick="window.miModal('editarEventoModal','${doc.id}')" class="btn btn-warning">
              <i class="bi bi-pencil-square"></i>
          </a>
          <a title="Eliminar datos del evento" href="#" onclick="window.miModal('eliminarEventoModal','${doc.id}')" class="btn btn-danger">
              <i class="bi bi-trash"></i>
          </a>               
        </td>
      `;
      tablaEventos.appendChild(fila);
    });
  } catch (error) {
    console.error("Error al obtener los eventos:", error);
  }
}

window.addEventListener("DOMContentLoaded", mostrarEventosEnHTML);

/**
 * Función para agregar un nuevo evento
 */
window.addNuevoEvento = async function (event) {
  event.preventDefault();

  const formulario = document.querySelector("#tablaEventos");
  const formData = new FormData(formulario);

  // Convertir FormData a un objeto JSON
  const formDataJSON = {};
  formData.forEach((value, key) => {
    formDataJSON[key] = value;
  });

  const { artista, nombre, fecha, hora, ubicacion } = formDataJSON;

  try {
    await addEvento(artista, nombre, fecha, hora, ubicacion);
    formulario.reset();
    setTimeout(() => {
      $("#agregarEventoModal").css("opacity", "");
      $("#agregarEventoModal").modal("hide");
    }, 300);

    window.mostrarAlerta({ tipoToast: "success", mensaje: "¡Evento registrado correctamente!" });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Función para cargar y mostrar los detalles del evento en la modal
 */
async function cargarDetalleEvento(id) {
  try {
    const eventoDoc = await getEventoCollection(id);
    if (eventoDoc.exists()) {
      const eventoData = eventoDoc.data();
      const { artista, nombre, fecha, hora, ubicacion } = eventoData;

      const ulDetalleEvento = document.querySelector("#detalleEventoContenido ul");

      ulDetalleEvento.innerHTML = ` 
        <li class="list-group-item"><b>Artista:</b> 
          ${artista ? artista : "No disponible"}
        </li>
        <li class="list-group-item"><b>Nombre:</b> 
          ${nombre ? nombre : "No disponible"}
        </li>
        <li class="list-group-item"><b>Fecha:</b> 
          ${fecha ? fecha : "No disponible"}
        </li>
        <li class="list-group-item"><b>Hora:</b>
         ${hora ? hora : "No disponible"}
        </li>
        <li class="list-group-item"><b>Ubicación:</b> ${ubicacion ? ubicacion : "No disponible"}</li>
      `;
    } else {
      console.log("No se encontró ningún evento con el ID:", id);
    }
  } catch (error) {
    console.error("Error al mostrar detalles del evento", error);
  }
}

/**
 * Buscar evento a editar
 */
async function getEventoUpdateCollection(id) {
  try {
    const eventoDoc = await getEventoCollection(id);
    if (eventoDoc.exists()) {
      const eventoData = eventoDoc.data();
      const { artista, nombre, fecha, hora, ubicacion } = eventoData;
      document.querySelector("#idEvento").value = id;
      document.querySelector("#artista").value = artista;
      document.querySelector("#nombre").value = nombre;
      document.querySelector("#fecha").value = fecha;
      document.querySelector("#hora").value = hora;
      document.querySelector("#ubicacion").value = ubicacion;
    } else {
      console.log("No se encontró ningún evento con el ID:", id);
    }
  } catch (error) {
    console.error("Error al obtener los detalles del evento:", error);
  }
}

/**
 * Función para actualizar el evento
 */
window.actualizarEvento = async function (event) {
  event.preventDefault();
  const formulario = document.querySelector("#formularioEventoEdit");
  const formData = new FormData(formulario);

  // Convertir FormData a un objeto JSON
  const formDataJSON = {};
  formData.forEach((value, key) => {
    formDataJSON[key] = value;
  });

  const { idEvento, artista, nombre, fecha, hora, ubicacion } = formDataJSON;
  try {
    await updateEventoCollection(idEvento, { artista, nombre, fecha, hora, ubicacion });
    formulario.reset();
    setTimeout(() => {
      $("#editarEventoModal").css("opacity", "");
      $("#editarEventoModal").modal("hide");
    }, 300);

    window.mostrarAlerta({ tipoToast: "success", mensaje: "¡Evento actualizado correctamente!" });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Función para borrar un evento
 */
async function eliminarEvento(id) {
  try {
    await deleteEventoCollection(id);
    document.querySelector(`#${id}`).remove();
    mostrarAlerta({ tipoToast: "success", mensaje: "Evento eliminado correctamente" });
  } catch (error) {
    console.error("Error al borrar el evento:", error);
    mostrarAlerta({ tipoToast: "error", mensaje: "Error al eliminar el evento" });
  }
}

/**
 * Función para mostrar alertas
 */
iziToast.settings({
  timeout: 10000,
  resetOnHover: true,
  transitionIn: "flipInX",
  transitionOut: "flipOutX",
  position: "topRight", 
  onOpening: function () {
    console.log("Alerta abierta!");
  },
  onClosing: function () {
    console.log("Alerta cerrada!");
  },
});
window.mostrarAlerta = function ({ tipoToast, mensaje }) {
  if (tipoToast == "success") {
    iziToast.success({
      timeout: 5000,
      icon: tipoToast == "success" ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill",
      title: tipoToast == "success" ? "¡Éxito!" : "¡Error!",
      message: mensaje,
    });
  } else if (tipoToast == "warning") {
    iziToast.success({
      timeout: 5000,
      icon: tipoToast == "success" ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill",
      title: tipoToast == "success" ? "¡Éxito!" : "¡Error!",
      message: mensaje,
    });
  }
};