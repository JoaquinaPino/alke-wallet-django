$(document).ready(function(){
    
    const bd = obtenerDatos();
    const historial = bd.transacciones;
    const contenedor = $('#lista-transacciones');

    if (historial.length === 0) {
        contenedor.append('<div class="p-3 text-center text-muted">No hay movimientos aún.</div>');
        return;
    }

    historial.forEach(function(movimiento){
        
        let colorMonto = movimiento.tipo === "ingreso" ? "text-success" : "text-danger";
       
        let montoFormateado = '$ ' + parseInt(movimiento.monto).toLocaleString('es-CL');

        const htmlFila = `
            <div class="list-group-item d-flex justify-content-between align-items-center p-3">
                <div class="d-flex align-items-center">
                    <div>
                        <div class="fw-bold">${movimiento.descripcion}</div>
                        <small class="text-muted">${movimiento.fecha}</small>
                    </div>
                </div>
                <span class="fw-bold ${colorMonto}">${montoFormateado}</span>
            </div>
        `;

        contenedor.append(htmlFila);
    });
});