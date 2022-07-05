const { validationResult } = require('express-validator');
exports.Inicio = (req, res)=>{
    const listaModulos = [
        { modulo: "Cai", ruta: "/api/cai"},
        { modulo: "Clientes", ruta: "/api/cargos"},
        { modulo: "Clientes Direcciones", ruta: "/api/clientesdir"},
        { modulo: "Detalle Pedidos", ruta: "/api/detallepedidos"},
        { modulo: "Detalle Ventas", ruta: "/api/detalleventas"},
        { modulo: "Empleados", ruta: "/api/empleados"},
        { modulo: "Estacion", ruta: "/api/estacion"},
        { modulo: "Pedidos", ruta: "/api/pedidos"},
        { modulo: "Pos", ruta: "/api/rutapos"},
        { modulo: "Productos", ruta: "/api/productos"},
        { modulo: "Usuarios", ruta: "/api/usuarios"},
        { modulo: "Ventas", ruta: "/api/ventas"},
        { modulo: "Ventas Anuladas", ruta: "/api/anuladas"},
        { modulo: "Ventas Constancia", ruta: "/api/constancia"},
        { modulo: "Ventas Exentas", ruta: "/api/exentas"},
        { modulo: "Ventas Pos", ruta: "/api/pos"},
        { modulo: "Ventas Sag", ruta: "/api/VentasSag"},
    ];
    const msj = {
        api: "API-VENTAS",
        descripcion: "Interfaz de progamación para el sistema de gestion de restaurantes",
        propiedad: "DESOFIW",
        desarrolladores: "",
        colaboradores: "",
        fecha: "5/07/2022",
        listaModulos
    };
    res.json(msj);
};