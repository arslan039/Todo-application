
const express = require('express');
const router = express.Router();
const taskController  = require("../controllers/task.js");
const isAuthenticated = require("../middlewares/Auth.js");

router.post("/new" , isAuthenticated , taskController.newTask);
router.get("/my" , isAuthenticated , taskController.getMyTask);
router.route("/:id").put( isAuthenticated , taskController.updateMyTask)
                    .delete(isAuthenticated , taskController.deleteMyTask)


module.exports = router;