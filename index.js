const express = require('express');
const app = express();
app.use(express.json());

// ESTA ES LA SEMILLA QUE DEBE SER IGUAL EN BLOGGER Y RENDER
const MASTER_SEED = "secret789"; 

function getValidToken() {
    const now = new Date();
    const hours = now.getHours();
    
    // Calcula el bloque de 2 horas (0-11)
    const timeBlock = Math.floor(hours / 2);
    const dateString = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    
    // Crear la cadena base (Igual a la de Blogger)
    const str = `${dateString}-block-${timeBlock}-${MASTER_SEED}`;
    
    // Convertir a Base64 y extraer 6 caracteres (Igual que btoa en JS)
    return Buffer.from(str).toString('base64').substring(0, 6).toUpperCase();
}

app.post('/api/login', (req, res) => {
    const { password } = req.body;
    const currentValidToken = getValidToken();

    if (password === currentValidToken) {
        res.status(200).json({ 
            success: true, 
            token: "TOKEN_DE_SESION_PROVISIONAL" 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            message: "Contraseña incorrecta o expirada" 
        });
    }
});

app.listen(3000, () => console.log("Servidor listo"));
