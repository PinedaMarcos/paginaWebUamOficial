'use strict'
var app = require('./app');
const PORT = process.env.PORT || 3902;





app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });