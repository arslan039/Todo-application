require('dotenv').config();
const app = require("./app.js")
const connectDb = require("./data/database");

connectDb();
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("server is running.")
})

