const User = require("../models/user.js")

// logic for getting the users from the database
const getAllUsers = async(req, res) => {
    const users = await User.find({});
    res.json({
        success : true,
        users,
    });
};

// logic for entering or registering the user in the database
const registerUsers =  async(req, res) => {
    const {name , email , password} = req.body;
    await User.create({
        name ,
        email ,
        password 
    });
    res.status(201).cookie("template" , "apnatimeayega").json({
        success : true,
        message : "User created successfully"
    })
}

 const specialFunc= async (req, res) => {
   
    res.json({
      success : true,
      message : "just trying to check."
    })
  };

  // logic for  getting data from params(Dynamic route),
  const getUserDetails = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id);
    res.json({
      success : true,
      user
    })
  }; 

  // logic for  updating  data from params(Dynamic route),
  const updateUserDetails = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
  
    try {
      const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      res.json({ success: true, message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
  // logic for  deleting data from params(Dynamic route),
  const deleteUserDetails = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      await User.deleteOne({ _id: id });
      return res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  
module.exports = { getAllUsers, registerUsers, specialFunc, getUserDetails, deleteUserDetails,updateUserDetails};