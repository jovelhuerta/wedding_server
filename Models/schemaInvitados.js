const mongoose = require("mongoose")


const InvitedSchema = new mongoose.Schema ({
    Nombre: {type: String, required:true},
    Numero:{type: Number, required:true},
    Notas:String
}, {
    versionKey: false
})


const Invitados = mongoose.model("Invitados",InvitedSchema)
module.exports=Invitados