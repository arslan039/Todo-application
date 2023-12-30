const User = require("../models/user.js")
const bcrypt = require("bcrypt");
const sendCookie = require("../utils/features.js");
const { response } = require("express");
const errMiddleware = require("../middlewares/error.js");


// logic for login the User in  the database

const loginUser =  async(req, res) => {
  try {
    const {email , password} = req.body;
  //  we did select password as we have done in schema the password select false, without doing it we can not pick the password 
   const user = await User.findOne({email}).select("+password");
   if(!user)  return next(new errMiddleware.ErrorHandler('Invalid Email or Password.', 404));
  const isMatch = await bcrypt.compare(password , user.password);
  if(!isMatch) return next(new errMiddleware.ErrorHandler('Invalid Email or Password.', 404));

  sendCookie(user , res , `Welcome back ${user.name}` , 201);
  } catch (error) {
    next(error);
  }
 
}

// logic for registering(SignUp) the user in the database

const registerUser =  async(req, res) => {
  try {
    const {name , email , password} = req.body;
    let user = await User.findOne({email});
    if(user) return next(new errMiddleware.ErrorHandler('User Already Registered.', 404));
     
    const hashedPassword = await bcrypt.hash(password, 10);
     user = await User.create({name , email, password : hashedPassword});
   sendCookie(user , res , "Registered Successfully" , 201);
  } catch (error) {
    next(error);
  }
}

  // logic for  getting data from params(Dynamic route), getting the user details by giving the user ID.

  const getMyProfile = async (req, res) => {
    try {
      const id = "myid";
   
      res.status(200).json({
       success : true,
       user : req.user,
      }) 
    } catch (error) {
      next(error);
    }

  }; 

  // logic for logout user

  const logoutUser = (req , res)=>{
    try {
      res
      .status(200)
      .cookie("token" , "" , {expires : new Date(Date.now()),
        sameSite : process.env.NODE_ENV ==="Development" ? "lax" : "none",
        secure : process.env.NODE_ENV ==="Development" ? false : true},
      )
      .json({
       success : true,
       user : req.user,
      }) 
    } catch (error) {
      next(error);
    } 
  }
 
module.exports = {registerUser,loginUser , getMyProfile, logoutUser};