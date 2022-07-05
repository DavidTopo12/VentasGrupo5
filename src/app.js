const express = require('express');
const morgan = require('morgan');
const path = require('path');
/*require('dotenv.config')*/ 

const app = express();

app.set('port',3002);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/', require('./rutas'));
app.use('/api/ventas', require('./rutas/rutaVentas'));
app.use('/api/detalleventas', require('./rutas/rutaDetalleVentas'));
app.use('/api/exentas', require('./rutas/rutaVentasExentas'));
app.use('/api/anuladas', require('./rutas/rutaVentasAnuladas'));
app.use('/api/constancia', require('./rutas/rutaVentasConstancia'));
app.use('/api/sag', require('./rutas/rutasVentasSag'));
app.use('/api/pos', require('./rutas/rutaVentasPos'));
app.use('/api/rutapos', require('./rutas/rutasPos'));
app.use('/api/cai', require('./rutas/rutascai'));
app.use('/api/empleados', require('./rutas/rutasEmpleados'));
app.use('/api/productos', require('./rutas/rutasProductos'));
app.use('/api/clientes', require('./rutas/rutasClientes'));
app.use('/api/clientesdir', require('./rutas/rutasClientesDirecciones'));
app.use('/api/pedidos', require('./rutas/rutasPedido'));
app.use('/api/detallepedidos', require('./rutas/rutasDetallePedido'));
app.use('/api/VentasSag', require('./rutas/rutasVentasSag'));
app.use('/api/estacion', require('./rutas/rutasestacion'));
app.use('/api/usuarios', require('./rutas/rutasUsuarios'));









app.listen(app.get('port'), () =>{
    console.log("Servidor iniciado en el puerto " + app.get('port'));
});

