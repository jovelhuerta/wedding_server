const mongoose = require("mongoose")

const CounterSchema =new mongoose.Schema({
    id:String,
    sequence_value:Number
}, {
    versionKey: false
}) 

const counter = mongoose.model("counters",CounterSchema)

module.exports=counter