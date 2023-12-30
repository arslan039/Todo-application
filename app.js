
const express = require('express');
const app = express();
const userRouter = require("./routes/user.js");
const taskRouter = require("./routes/task.js");
const cookieParser = require('cookie-parser');
const errMiddleware = require("./middlewares/error.js");
const cors = require('cors');
// using middleware for accessing the content from json body, this middleware should be used before using the secondOne used middleware.
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET", "POST" , "PUT", "DELETE"],
    credentials : true,
  
}
 
));

// middleware for connecting the routers with the whole app
app.use( "/api/v1/users" , userRouter);
app.use( "/api/v1/task" , taskRouter);
// using error handling middleware
app.use(errMiddleware.errorMiddleware)
module.exports = app;


