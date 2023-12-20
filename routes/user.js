const express = require('express');
const router = express.Router();
const UserController  = require("../controllers/user.js");


router.get("/users/all", UserController.getAllUsers);
router.post("/users/new", UserController.registerUsers);
router.get("/userId/special" , UserController.specialFunc);
// Endpoint for  getting data from params(Dynamic route), always keep the dynamic route at the end of the code .
router.get("/userId/:id" , UserController.getUserDetails);
router.put("/userId/:id" , UserController.updateUserDetails);
router.delete("/userId/:id" , UserController.deleteUserDetails);

  module.exports = router;