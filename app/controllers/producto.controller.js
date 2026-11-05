// vamos a manejar los recursos de get, post, put y delete  

const db= require("../models");
const Producto = db.producto; // aqui cambio
const Op = db.Sequelize.Op;


// CREAR NUEVO
exports.create =(req, res)=>{

if(!req.body.nombre){ //aqui cambio
    res.status(400)({

        massage:"el nombre es requerido"
    });
    return;
}
const producto={ // aqui cambio
    nombre:req.body.nombre, // aqui cambio
     precio:req.body.precio, // aqui cambio
      cantidad:req.body.cantidad, // aqui cambio
        descripcion:req.body.descripcion , // aqui cambio
}

Producto.create(producto) // aqui cambio
.then(data=>{
    res.send(data);
})
.catch(err=>{
    res.status(500).send({
        message:err.message||"ocurrio un error el crear el producto"
    });
});

};


// MOSTRAR TODOS
exports.findAll=(req, res)=>{
   
Producto.findAll() // aqui cambio
.then(data=>{
    res.send(data);
})
.catch(err=>{
    res.status(500).send({
        message:err.message||"ocurrio un error al recuperar los productos"
    });
});
};


// BUSCAR POR ID 
exports.findOne = (rep,res) => {
const  id = req.params.id; // aqui cambio si quiero buscar por ejemplo id_productos

Producto.findByPk(id) // aqui cambio
.then(data=>{
 res .send(data);
})  
.catch(err=> {
    res.status(500).send({
     message: "Error retrieving proveedor with id=" + id
    });
});
};


// ACTUALIZAR
exports.update = (req,res)=>{
    const id=req.params.id;

    Producto.update(req.body,{ // aqui cambio
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


// ELIMINAR
exports.delete =(req, res) =>{
    const id= req.params.id;
    //utilizamos el metodo destroy para eliminar el objeto mandamos la condicionante wuere id = parametro que recibimos
Producto.destroy({ // aqui cambio
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


// ELIMINAR TODOS
exports.deleteAll=(req,res) =>{
    Producto.destroy({  // aqui cambio
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
