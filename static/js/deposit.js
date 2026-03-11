$(document).ready(function(){

    function mostrarFeedback(titulo, mensaje, esExito) {

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
            icono.html('<i class="bi bi-exclamation-circle-fill text-danger"></i>'); 
        }

        const modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
        modal.show();

        if (esExito) {
            $('#feedbackModal').on('hidden.bs.modal', function () {
                window.location.href = '/menu/';
            });
        }
    }

    $('#deposit-form').on('submit', function(e){
        e.preventDefault();

        const montoIngresado = $('#deposit-amount').val();
        const monto = parseInt(montoIngresado);

        if(isNaN(monto) || monto <= 0 ) {
            mostrarFeedback("Error", "Por favor ingresa un monto válido mayor a $0.", false);
            return;
        }

        const bd = obtenerDatos();
        
        bd.usuario.saldo = parseInt(bd.usuario.saldo) + monto;

        const nuevaTransaccion = {
            id: Date.now(),
            fecha: new Date().toLocaleDateString(),
            monto: monto,
            tipo: "ingreso",
            descripcion: "Depósito en cuenta"
        };
        bd.transacciones.unshift(nuevaTransaccion);

        guardarDatos(bd);

        mostrarFeedback("¡Depósito Exitoso!", `Has añadido $${monto.toLocaleString('es-CL')} a tu cuenta.`, true);
    });
});