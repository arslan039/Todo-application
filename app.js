
const express = require('express');
const app = express();
const userRouter = require("./routes/user.js");


// using middleware for accessing the content from json body
app.use(express.json());
// middleware for connecting the routers with the whole app
app.use(userRouter);


module.exports = app;


