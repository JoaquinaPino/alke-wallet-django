$(document).ready(function(){

    let bd = obtenerDatos();
    const listaContactos = $('#lista-contactos');
    const inputBuscador = $('#buscador-contacto');
    const inputSeleccionado = $('#contacto-seleccionado');

    function renderizarContactos(filtro = "") {
        listaContactos.empty(); 
        const contactosFiltrados = bd.contactos.filter(c => 
            c.nombre.toLowerCase().includes(filtro.toLowerCase())
        );

        if (contactosFiltrados.length === 0) {
            listaContactos.append('<div class="list-group-item text-muted text-center">No se encontraron contactos.</div>');
            return;
        }

        contactosFiltrados.forEach(c => {
            const item = `
                <button type="button" class="list-group-item list-group-item-action contact-item" data-nombre="${c.nombre}">
                    <div class="d-flex w-100 justify-content-between align-items-center">
                        <h6 class="mb-1 fw-bold">${c.nombre}</h6>
                        <small class="text-muted">${c.banco}</small>
                    </div>
                    <small class="text-muted fst-italic">${c.tipo} - N°: ${c.numeroCuenta}</small>
                </button>
            `;
            listaContactos.append(item);
        });
    }

    renderizarContactos();

    inputBuscador.on('keyup', function() {
        const texto = $(this).val();
        renderizarContactos(texto);
    });

    listaContactos.on('click', '.contact-item', function() {
        $('.contact-item').removeClass('active bg-primary text-white');
        $('.contact-item').find('small').removeClass('text-white-50').addClass('text-muted');
        
        $(this).addClass('active bg-primary text-white');
        $(this).find('small').removeClass('text-muted').addClass('text-white-50');
        
        const nombre = $(this).data('nombre');
        inputSeleccionado.val(nombre);
    });

    function mostrarFeedback(titulo, mensaje, esExito, redireccionar) {
        $('#feedbackTitle').text(titulo);
        $('#feedbackMessage').text(mensaje);

        const header = $('#feedbackHeader');
        const icono = $('#feedbackIcon');

        header.removeClass('bg-success bg-danger bg-primary');
        
        if (esExito) {
            header.addClass('bg-success');
            icono.html('<i class="bi bi-check-circle-fill text-success"></i>');
        } else {
            header.addClass('bg-danger');
            icono.html('<i class="bi bi-exclamation-triangle-fill text-danger"></i>');
        }

        $('#feedbackModal').off('hidden.bs.modal');

        if (esExito && redireccionar) {
            $('#feedbackModal').on('hidden.bs.modal', function () {
                window.location.href = '/menu/';
            });
        }

        const modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
        modal.show();
    }

    $('#form-nuevo-contacto').on('submit', function(e) {
        e.preventDefault();
        const nuevoContacto = {
            id: Date.now(),
            nombre: $('#nuevo-nombre').val(),
            rut: $('#nuevo-rut').val(),
            banco: $('#nuevo-banco').val(),
            tipo: $('#nuevo-tipo').val(),
            numeroCuenta: $('#nuevo-num-cuenta').val()
        };
        bd.contactos.push(nuevoContacto);
        guardarDatos(bd);
        renderizarContactos();
        
        $('#modalNuevoContacto').modal('hide');
        $('#form-nuevo-contacto')[0].reset();

        mostrarFeedback("¡Contacto Guardado!", "El nuevo destinatario ha sido agregado a tu lista.", true, false);
    });

    $('#sendmoney-form').on('submit', function(e){
        e.preventDefault();

        const contactoNombre = inputSeleccionado.val();
        const monto = parseInt($('#amount-input').val());

        if (!contactoNombre) {
            mostrarFeedback("Falta Información", "Por favor haz click en un contacto de la lista para seleccionarlo.", false, false);
            return;
        }
        if (isNaN(monto) || monto <= 0) {
            mostrarFeedback("Monto Inválido", "Por favor ingresa un monto válido mayor a 0.", false, false);
            return;
        }

        bd = obtenerDatos();
        const saldoActual = bd.usuario.saldo;

        if (monto > saldoActual) {
            mostrarFeedback("Fondos Insuficientes", "No tienes suficiente saldo para esta operación.", false, false);
            return;
        }

        bd.usuario.saldo = saldoActual - monto;

        const nuevaTransaccion = {
            id: Date.now(),
            fecha: new Date().toLocaleDateString(),
            monto: -monto,
            tipo: "egreso",
            descripcion: `Transferencia a ${contactoNombre}`
        };
        bd.transacciones.unshift(nuevaTransaccion);

        guardarDatos(bd);

        mostrarFeedback("¡Envío Exitoso!", `Has transferido $${monto.toLocaleString('es-CL')} a ${contactoNombre}.`, true, true);
    });
});