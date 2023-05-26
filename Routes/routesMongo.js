const express = require("express")
const router = express.Router()
const Invitados = require("../Models/schemaInvitados")

const Message = require("../Models/schemaMessage")
const counterM = require("../Models/schemaCounter")


router.route("/createMessage").post((req,res)=>{
    const de=req.body.De
    const para=req.body.Para
    const mensaje=req.body.Mensaje
    counterM.findOneAndUpdate(
        {id:"serial_seq"},
        {"$inc":{"sequence_value":1}},
        {new:true},{
            upsert:true
        }
    ).then((cd,err)=>{
        let seqID;
        if(cd==null||cd == undefined){
            const newval=new counterM({id:"serial_seq",sequence_value:0})
            newval.save()
            seqID=0
        }else{
            seqID=cd.sequence_value
        }
        const newMessage = new Message({
            De: de,
            Para:para,
            Mensaje: mensaje,
            serial:seqID
        })
        
        newMessage.save().then(result => {
            console.log(result);
            res.status(201).json({
              message: "Handling POST Message",
              createdProduct: result
            });
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
    })
    
    return res.status(200)
})

router.route("/confirmar").post((req,res)=>{
    const nombre=req.body.Nombre
    const numero=req.body.Numero
    const nota=req.body.Notas

    const conf = new Invitados({
        Notas:nota,
        Nombre:nombre,
        Numero:numero
    })

    conf.save().then(result => {
        console.log(result);
        res.status(201).json({
          message: "Handling POST Confirm",
          createdProduct: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
})


router.route("/").get((req,res)=>{
    return Message.find().then(found=> res.json(found))
})

router.route("/get").get((req,res)=>{
    return Invitados.find().then(found=>res.json(found))
})


module.exports=router

