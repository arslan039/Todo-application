const mongoose = require('mongoose');

// creating the schema for users
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema); 

module.exports = User; // Export the 'User' model
