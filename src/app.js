const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// Middleware para parsear JSON
app.use(express.json());

//conexion a la base de datos
const mySqlConnection = require('./config/db');

// Rutas
// Crear un get rapido de usuarios
app.get('/users', (req, res) => {
    mySqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
    mySqlConnection.end();
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});