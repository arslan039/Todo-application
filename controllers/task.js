const Task = require("../models/task.js");
const errMiddleware = require("../middlewares/error.js");

// LOGIC FOR CREATING THE TASK IN THE DATABASE

const newTask = async(req , res , next)=>{
try {
    const {title , description} = req.body;

    await Task.create({
        title, 
        description ,
        user : req.user,
    });
    res.status(200).json({
        success : true,
        message : "Task added successfully."
    }) 
} catch (error) {
    next(error);
}
}
// logic for drawing or getting all the tasks from the database for the specific user used ID
const getMyTask = async(req , res , next)=>{
    try {
        const userId = req.user._id;
        const tasks = await Task.find({user : userId});
    
        res
        .status(200)
        .json({
            success : true,
            tasks,
        })
    } catch (error) {
        next(error);
    }

   
}
// logic for updating the task in the database

const updateMyTask = async(req , res , next)=>{
    try {
        const {id} = req.params;
const task = await Task.findById(id);
task.isCompleted = !task.isCompleted;
// using error handler
 if(!task) return next(new errMiddleware.ErrorHandler('Task not found', 404));
await task.save();

    res
    .status(200)
    .json({
        success : true,
        messsage : 'Task updated successfully',
    })
    } catch (error) {
        next(error);
    }
}

// Logic for deleting the task in the database
const deleteMyTask = async(req , res , next)=>{
    try {
        const {id} = req.params;
        const task = await Task.findById(id);
    
    if(!task) return next(new errMiddleware.ErrorHandler('Task not found', 404));
    
        await task.deleteOne();
        res
        .status(200)
        .json({
            success : true,
            messsage : 'Task deleted successfully',
        })
    } catch (error) {
        next(error); 
    }
}




module.exports = {newTask, getMyTask,deleteMyTask, updateMyTask};