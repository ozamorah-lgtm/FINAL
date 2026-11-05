// vamos a manejar los recursos de get, post, put y delete  

const db= require("../models");
const Producto = db.producto;
const Op = db.Sequelize.Op;

exports.create =(req, res)=>{
// logica para crear el nuevo proveedor

if(!req.body.nombre){
    res.status(400)({

        massage:"el nombre es requerido"
    });
    return;
}
const producto={
    nombre:req.body.nombre,
     precio:req.body.precio,
      cantidad:req.body.cantidad,
        descripcion:req.body.descripcion ,
}

// Guardar un nuevo proveedor en la base de datos
Producto.create(producto)
.then(data=>{
    res.send(data);
})
.catch(err=>{
    res.status(500).send({
        message:err.message||"ocurrio un error el crear el producto"
    });
});

};


// Recuperar todos los proveedores de la base de datos.
exports.findAll=(req, res)=>{
    const nombre= req.query.nombre;
    var condition = nombre ?{ nombre: {[Op.iLike]: '%${nombre}%'}}: null;
Producto.findAll({where:condition})
.then(data=>{
    res.send(data);
})
.catch(err=>{
    res.status(500).send({
        message:err.message||"ocurrio un error al recuperar los productos"
    });
});
};


// Buscar un único tutorial por ID
exports.findOne = (rep,res) => {
const  id = req.params.id;

Producto.findByPk(id)
.then(data=>{
 res .send(data);
})  
.catch(err=> {
    res.status(500).send({
     message: "Error retrieving proveedor with id=" + id
    });
});
};

// Actualizar un tutorial mediante el ID de la solicitud
exports.update = (req,res)=>{
    const id=req.params.id;

    Producto.update(req.body,{
        where: {id: id}
    })
    .then(num=>{
        if (num==1){
            res.send({
                message :"cliente was update seccessfully"
            });
        }
        else {
            res.send ({
                message :'Cannot update  Cliente whit id=${id}. Maybe Cliente was not found or req.body is empty!' 
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error updating Client with id=" + id
        });
    });
};


// Eliminar un cliente con el ID especificado en la solicitud
exports.delete =(req, res) =>{
    const id= req.params.id;
    //utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante wuere id = parametro que recibimos
Producto.destroy({
    where:{id:id}
})
.then (num=>{
    if(num==1){
        res.send({
            message:"Client was deleted seccessfully!"
        });    
    }else {
        res.send({
            message:'Cannot delete Client with id=${id}.El cliente no fue encontrado'
    });
}
})
.catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
});
};


// Eliminar todos los clientes de la base de datos.
exports.deleteAll=(req,res) =>{
    Producto.destroy({
        where:{},
        truncate:false
    })
    .then(nums=>{
        res.send({message: '${nums} Clients were deleted  successfully!'});
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message|| "some error occurred while removing all clients"
        });
    });
};
