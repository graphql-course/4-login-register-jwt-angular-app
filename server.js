const path = require('path');

const express = require('express');

const app = express();

app.use(express.static(__dirname + 'login-jwt'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'login-jwt', 'index.html'));
});

app.listen ( {
    port: process.env.PORT || 8080
},
    () => console.log(`Servidor iniciado en http://localhost:8080`)   
);