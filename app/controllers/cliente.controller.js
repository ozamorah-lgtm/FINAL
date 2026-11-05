// Importamos la base de datos y los modelos
const db = require("../models");
const Cliente = db.cliente;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo cliente
exports.create = (req, res) => {
    if (!req.body.nombre || !req.body.apellido) {
        return res.status(400).send({
            message: "El nombre y el apellido son requeridos."
        });
    }

    const cliente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        direccion: req.body.direccion,
        correo: req.body.correo,
        telefono: req.body.telefono,
        ingreso: req.body.ingreso,
        status: req.body.status ?? false
    };

    Cliente.create(cliente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    "Ocurrió un error al crear el cliente."
            });
        });
};

// Recuperar todos los clientes
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;

    const condition = nombre
        ? {
            nombre: {
                [Op.iLike]: `%${nombre}%`
            }
        }
        : null;

    Cliente.findAll({
        where: condition
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    "Ocurrió un error al recuperar los clientes."
            });
        });
};

// Buscar un cliente por ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cliente.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el cliente con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al buscar el cliente con id=${id}.`
            });
        });
};

// Actualizar un cliente por ID
exports.update = (req, res) => {
    const id = req.params.id;

    Cliente.update(req.body, {
        where: { id: id }
    })
        .then(result => {
            const num = result[0];

            if (num === 1) {
                res.send({
                    message: "El cliente fue actualizado correctamente."
                });
            } else {
                res.status(404).send({
                    message:
                        `No se pudo actualizar el cliente con id=${id}. ` +
                        "Puede que no exista o que los datos estén vacíos."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al actualizar el cliente con id=${id}.`
            });
        });
};

// Eliminar un cliente por ID
exports.delete = (req, res) => {
    const id = req.params.id;

    Cliente.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "El cliente fue eliminado correctamente."
                });
            } else {
                res.status(404).send({
                    message:
                        `No se pudo eliminar el cliente con id=${id}. ` +
                        "El cliente no fue encontrado."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `No se pudo eliminar el cliente con id=${id}.`
            });
        });
};

// Eliminar todos los clientes
exports.deleteAll = (req, res) => {
    Cliente.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({
                message: `${nums} clientes fueron eliminados correctamente.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    "Ocurrió un error al eliminar todos los clientes."
            });
        });
};

// Buscar todos los clientes activos
exports.findAllStatus = (req, res) => {
    Cliente.findAll({
        where: { status: true }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message ||
                    "Ocurrió un error al recuperar los clientes activos."
            });
        });
};