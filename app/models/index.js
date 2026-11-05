// Cargamos el archivo de configuración de la base de datos
const dbConfig = require("../config/db.config.js");

// Importamos Sequelize
const Sequelize = require("sequelize");

// Creamos la conexión con la base de datos
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
  }
);

// Creamos el objeto que contendrá la conexión y los modelos
const db = {};

// Guardamos Sequelize y la conexión
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Registramos los modelos
db.cliente = require("./cliente.model.js")(sequelize, Sequelize);
db.proveedor = require("./proveedor.model.js")(sequelize, Sequelize);
db.producto = require("./producto.model.js")(sequelize, Sequelize);

// Exportamos el objeto db
module.exports = db;