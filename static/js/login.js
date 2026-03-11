$(document).ready(function(){

    function mostrarError(mensaje) {
        $('#feedbackTitle').text("Error de Ingreso");
        $('#feedbackMessage').text(mensaje);
        $('#feedbackHeader').addClass('bg-danger');
        $('#feedbackIcon').html('<i class="bi bi-shield-lock-fill text-danger"></i>');
        
        const modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
        modal.show();
    }

    $('#login-form').on('submit', function(e){
        e.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();

        if (email === '' || password === ''){
            mostrarError('Por favor, completa todos los campos.');
            return;
        }

        window.location.href = '/menu/';
    });
});