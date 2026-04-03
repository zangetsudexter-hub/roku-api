const express = require('express');
const app = express();
app.use(express.json());

// Base de datos de ejemplo (En el futuro usarías una real como MongoDB o MySQL)
const usuarios = [
    { user: "admin", pass: "1234", token: "ABC-123-TOKEN" },
    { user: "usuario1", pass: "clave99", token: "XYZ-999-TOKEN" }
];

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Buscar si el usuario existe
    const usuarioEncontrado = usuarios.find(u => u.user === username && u.pass === password);

    if (usuarioEncontrado) {
        // Si es correcto, enviamos éxito y el token
        res.json({
            status: "success",
            token: usuarioEncontrado.token
        });
    } else {
        // Si falla, enviamos error
        res.status(401).json({
            status: "error",
            message: "Credenciales inválidas"
        });
    }
});

app.listen(3000, () => console.log('Servidor de Roku corriendo en el puerto 3000'));

