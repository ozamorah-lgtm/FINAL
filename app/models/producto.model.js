
module.exports=(sequelize,Sequelize) => {

const Producto = sequelize.define("producto",{

nombre:{
    type: Sequelize.STRING
},

precio:{
    type: Sequelize.STRING
},

cantidad:{
    type: Sequelize.STRING
},

descripcion:{
    type: Sequelize.STRING
},


});

return Producto;

};