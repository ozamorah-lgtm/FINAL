module.exports = app => {
    const producto = require("../controllers/producto.controller.js");
    var router = require("express").Router();
    // Create a new Client
    router.post("/create/", producto.create);
    // Retrieve all Client
    router.get("/", producto.findAll);
    
    // Retrieve a single Client with id
    router.get("/:id", producto.findOne);
    // Update a Client with id
    router.put("/update/:id", producto.update);
    // Delete a Client with id
    router.delete("/delete/:id", producto.delete);
    // Delete all Cliente
    router.delete("/delete/", producto.deleteAll);
    // Podemos utilizar como una ocpion app.use("EndPoint",router" para simplicar el URI
    // Ej.  http://localhost:Puerto/api/cliente/
    app.use("/api/producto", router);
};