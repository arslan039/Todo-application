
require('dotenv').config({
    path: './data/config.env'
});
const mongoose = require('mongoose');


 const connectDb = () =>{
    mongoose.connect(process.env.MONGODB_URI  , {
        dbName : "todobackend",
    }).then(()=>{
       console.log("database is connected") 
    }).catch((error)=>{
        console.log("Database is not connected" , error);
    });
 }

module.exports = connectDb;

