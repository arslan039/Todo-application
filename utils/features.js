const jwt = require("jsonwebtoken");
const sendCookie = (user , res , message , statusCode) =>{
    const token = jwt.sign({_id : user._id}, process.env.JWT_SECRET)
    res
    .status(201)
    .cookie("token" , token, {
      httpOnly : true,
      maxAge :1000*60*15,
      sameSite : process.env.NODE_ENV ==="Development" ? "lax" : "none",
      secure : process.env.NODE_ENV ==="Development" ? false : true,
    })
    .json({
      success : true, 
      message,
    })
} 
module.exports = sendCookie;