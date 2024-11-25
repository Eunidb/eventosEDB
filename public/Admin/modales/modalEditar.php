<div class="modal fade" id="editarEventoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 titulo_modal">Editar Datos del Evento</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formularioEventoEdit" action="" method="POST" autocomplete="off">
                    <input type="hidden" name="idEvento" id="idEvento" />
                    <div class="mb-3">
                        <label class="form-label">Nombre del Evento</label>
                        <input type="text" name="nombre_evento" id="nombre_evento" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Artista</label>
                        <input type="text" name="artista" id="artista" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Fecha del Evento</label>
                        <input type="date" name="fecha" id="fecha" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Hora del Evento</label>
                        <input type="time" name="hora" id="hora" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Ubicación del Evento</label>
                        <input type="text" name="ubicacion" id="ubicacion" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Precio de Entrada</label>
                        <input type="number" name="precio" id="precio" class="form-control" required />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Descripción del Evento</label>
                        <textarea name="descripcion" id="descripcion" class="form-control" rows="4" required></textarea>
                    </div>
                    <div class="d-grid gap-2">
                        <button type="submit" class="btn btn-primary btn_add" onclick="window.actualizarEvento(event)">
                            Actualizar datos del evento
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
