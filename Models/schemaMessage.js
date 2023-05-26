const mongoose = require("mongoose")


const MensajeSchema =new mongoose.Schema({
    De: {type: String, required:true},
    Para:{type: String, required:true},
    Mensaje: {type: String, required:true},
    serial:Number
}, {
    versionKey: false
}) 


const Mensaje = mongoose.model("Mensaje",MensajeSchema)

module.exports=Mensaje