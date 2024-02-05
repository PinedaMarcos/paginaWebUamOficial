const { Datos } = require("../db");
const fs = require('fs');

exports.save = async (req, res) => {
  try {
    // Aquí, 'Imagen' debe coincidir con el nombre del campo en el formulario Angular
    const { nombreCientifico, nombreColoquial, autor, campoRequerido } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'No se ha recibido ningún archivo',
      });
    }

    const imagen = req.files.Imagen;
    const nombre= imagen.name;
    console.log(nombre);
    const campoRequeridoValue = (campoRequerido === '1') ? 'flora' : 'fauna';
    const uploadPath = `./imagenes/${campoRequeridoValue}`;

    // Crear la carpeta de destino si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    const filePath = `${uploadPath}/${nombre}`;

    // Mover el archivo a la carpeta de destino
    imagen.mv(filePath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          status: 'error',
          message: 'Hubo un error al mover el archivo',
          err,
        });
      }

      // Guardar el nombre del archivo en la base de datos
      Datos.create({
        nombreCientifico,
        nombreColoquial,
        autor,
        imagen: nombre.toString(),
        campoRequerido: campoRequerido
      });

      return res.json({
        status: 'success',
        message: 'Dato registrado correctamente',
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      message: 'Hubo un error en la BD',
      err,
    });
  }
};


  exports.update = async (req, res) => {
    const { idDato } = req.params; //variables directamente en la URL
    try {
      const updated = await Datos.update(
        { ...req.body },
        {
          where: {
           id: idDato, 
          },
        }
      );
      if (updated[0] == 0) {
        return res.json({
          status: "error",
          message: "No se actualizo",
        });
      }
      return res.json({
        status: "success",
        message: "Dato actualizado correctamente",
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: "Error en la BD",
        err,
      });
    }
  };

  exports.consultarDato= async (req, res) =>{
    const {idDato} = req.params;
    try{
        const dato = await Datos.findByPk(idDato);
        if (!dato){
            return res.status(400).json({
                status: "error",
                message: "No se encontro el dato",
            });            
        }
        return res.status(200).json({
            status: "success",
            message: "Dato encontrado",
            dato
        });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            status: "error",
            message: "Error en la BD",
            err,
          });
    }
  }
  exports.consultarDatoEsp= async (req, res) =>{
    const {autor} = req.params;
    try{
        const autor = await Datos.findOne({where: { } });
        if (!autor){
            return res.status(400).json({
                status: "error",
                message: "No se encontro el dato",
            });            
        }
        return res.status(200).json({
            status: "success",
            message: "Dato encontrado",
            autor
        });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            status: "error",
            message: "Error en la BD",
            err,
          });
    }
  }

  exports.consultarDatos= async (req, res) =>{
    //const {datos} = req.params;
    try{
        //const datos = await Datos.findAll();
        let { where } = req.query
        let whereValue = JSON.parse(where || "{}");

        data = await Datos.findAll({
                where: whereValue
            })
        if (data.length == 0){
            return res.status(400).json({
                status: "error",
                message: "No se encontraron los datos",
            });            
        }
        return res.status(200).json({
            status: "success",
            message: "Datos encontrado",
            data
        });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            status: "error",
            message: "Error en la BD",
            err,
          });
    }
  }

  exports.delete = async (req, res) => {
    const { idDato } = req.params;
  
    try {
      const datoEliminado = await Datos.destroy({
        where: {
          id: idDato
        }
      });
  
      if (!datoEliminado) {
        return res.status(404).json({ msg: 'Dato no encontrado' });
      }
  
      res.json({
        msg: 'Dato eliminado exitosamente',
        idDato: Number(idDato), 
      });
    } catch (error) {
      console.error('Error al eliminar el dato', error);
      res.status(500).json({ msg: 'Error al eliminar el dato' });
    }
  };


