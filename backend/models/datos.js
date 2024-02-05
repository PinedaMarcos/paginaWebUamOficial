module.exports=(sequelize,type)=>{
    return sequelize.define('datos',{
        id:{
            type:type.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        nombreCientifico: type.STRING,
        nombreColoquial: type.STRING,
        autor: type.STRING,
        imagen: type.STRING,
        campoRequerido: type.INTEGER
    })
}