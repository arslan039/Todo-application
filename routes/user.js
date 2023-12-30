const express = require('express');
const router = express.Router();
const UserController  = require("../controllers/user.js");
const isAuthenticated = require("../middlewares/Auth.js")


router.post("/new", UserController.registerUser);
router.get("/login" , UserController.loginUser);
router.get("/logout" , UserController.logoutUser);
// Endpoint for  getting data from params(Dynamic route), always keep the dynamic route at the end of the code .
router.get("/me" , isAuthenticated, UserController.getMyProfile);

  module.exports = router;