"use strict";

const express = require("express");

const DatosController = require("../controlador/datos")
const router = express.Router();


// ---------Crear Datos ------------------
router.post('/crearDato', DatosController.save);

// -------- Actualizar Datos --------------
router.put('/actualizarDato/:idDato', DatosController.update);
//----------Consultar Dato----------------
router.get('/proyectoUam/consultarDato/:idDato', DatosController.consultarDato);
//------------Consultar Dati especifico--------
router.get('/consultarDatoEsp/:autor', DatosController.consultarDatoEsp);
//-------------Consultar Datos----------------
router.get('/consultarDatos', DatosController.consultarDatos);
//-----------Eliminar Dato--------------
router.delete('/:idDato', DatosController.delete);
//post crear
//get consultar
//put actualizar
//delete eliminar

module.exports = router;