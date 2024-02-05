const { Sequelize } = require('sequelize');

const datosModel = require('./models/datos')



    const sequelize = new Sequelize('proyecto_uam_db', 'root', '', {
       host: '127.0.0.1',
      dialect: 'mysql' ,
      define: { 
          timestamps: false
      }
    })

  const Datos = datosModel(sequelize, Sequelize);
  

  sequelize.sync({force: false})
  .then(()=>{
      console.log("tablas sincronizadas")
  })

 
  module.exports ={
      Datos
  }