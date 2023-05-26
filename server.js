const express =require("express")
const app = express()
const mongoose = require("mongoose")
// var originsWhitelist = [
//   'http://localhost:3010'     //this is my front-end url for development

// ];|
// var corsOptions = {
//   origin: function(origin, callback){
//         console.log(origin);
//         var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
//         console.log(isWhitelisted);
//         callback(null, isWhitelisted);
//   },
//   credentials:true
// }

// app.use(cors(corsOptions))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });
app.use(express.json())

//Connecto Mongo
const connection= "mongodb+srv://dev:devpass@efectodbgym.vl4xrqe.mongodb.net/Wedding?retryWrites=true&w=majority"



mongoose.connect(connection)
.then(()=>console.log("Mongo Connection established...."))
.catch((error)=>console.error("Mongo connection failed: "+connection+error.message))

//require route

app.use("/", require("./Routes/routesMongo"))

app.listen(3001, ()=>{
    console.log("Express is running on port 3001")
})