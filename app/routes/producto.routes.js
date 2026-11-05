module.exports = app => {
    const producto = require("../controllers/producto.controller.js"); // aqui cambio
    var router = require("express").Router();

    // CREAR NUEVO
    router.post("/create/", producto.create);

    // MOSTRAR TODOS
    router.get("/", producto.findAll);
    
    // BUSCAR POR ID 
    router.get("/:id", producto.findOne);

    // ACTUALIZAR
    router.put("/update/:id", producto.update);

    // ELIMINAR
    router.delete("/delete/:id", producto.delete);

    // ELIMINAR TODOS
    router.delete("/delete/", producto.deleteAll);

    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    
    app.use("/api/producto", router);
};