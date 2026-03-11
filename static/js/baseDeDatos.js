const bdInicial = {
    usuario: {
        nombre: "Joaquina Pino",
        saldo: 90000,
        numeroCuenta: "774-0011-22",
        banco: "Alke Bank",
        rut: "20.918.474-5"
    },
    contactos: [
        { 
            id: 1, 
            nombre: "Juan Pérez", 
            numeroCuenta: "987-6543-21", 
            banco: "Banco Estado", 
            rut: "12.345.678-9", 
            tipo: "Cuenta RUT" 
        },
        { 
            id: 2, 
            nombre: "María López", 
            numeroCuenta: "111-2222-33", 
            banco: "Banco de Chile", 
            rut: "9.876.543-2", 
            tipo: "Cuenta Corriente" 
        },
        { 
            id: 3, 
            nombre: "Carlos Ruiz", 
            numeroCuenta: "555-4444-11", 
            banco: "Banco Santander", 
            rut: "15.678.901-5", 
            tipo: "Cuenta Vista" 
        }
    ],
    transacciones: [
        { id: 1, fecha: "10/01/2024", monto: 50000, tipo: "ingreso", descripcion: "Depósito inicial" },
        { id: 2, fecha: "12/01/2024", monto: -10000, tipo: "egreso", descripcion: "Transferencia a Juan Pérez" },
        { id: 3, fecha: "14/01/2024", monto: 50000, tipo: "ingreso", descripcion: "Depósito Cajero" }
    ]
};

function inicializarBaseDeDatos() {

    if (!localStorage.getItem('alkeWalletBD')) {
       
        localStorage.setItem('alkeWalletBD', JSON.stringify(bdInicial));
        console.log("Base de datos inicializada con éxito.");
        
        localStorage.setItem('saldoWallet', bdInicial.usuario.saldo);
    } else {
        console.log("Base de datos ya existente. Cargando...");
    }
}

inicializarBaseDeDatos();

function obtenerDatos() {
    const datosGuardados = localStorage.getItem('alkeWalletBD');
    return JSON.parse(datosGuardados);
}

function guardarDatos(datos) {
    localStorage.setItem('alkeWalletBD', JSON.stringify(datos));
    localStorage.setItem('saldoWallet', datos.usuario.saldo);
}

$(document).ready(function() {

    if ($('#nombre-sidebar').length > 0) {
        const datos = obtenerDatos(); 
        $('#nombre-sidebar').text(datos.usuario.nombre);
    }
});