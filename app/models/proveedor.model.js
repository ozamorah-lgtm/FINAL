
module.exports=(sequelize,Sequelize) => {

const Proveedor = sequelize.define("proveedor",{

nombre:{
    type: Sequelize.STRING
},

apellido:{
    type: Sequelize.STRING
},

direccion:{
    type: Sequelize.STRING
},

telefono:{
    type: Sequelize.STRING
},



});

return Proveedor;

};