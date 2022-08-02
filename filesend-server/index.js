const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Crear servidor
const app = express();

//conectar a la bd
conectarDB();

//Habilitar controllers
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use( cors(opcionesCors) );

//puerto de la app
const port = process.env.PORT || 4000;

// Habilidar leer los valores del body
app.use( express.json() );

//Habilitar carpeta publica
app.use( express.static('uploads') );

// Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enlaces', require('./routes/enlaces'));
app.use('/api/archivos', require('./routes/archivos'));

app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})