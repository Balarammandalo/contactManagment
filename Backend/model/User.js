const mongoose = require("mongoose")
const {Schema} = mongoose

const userSchema = new Schema({
    name: {
        type: String,
        require: [true , "Name is require"]
    },
    email: {
        type: String,
        require: [true , "Email is require"]
    },
    password: {
        type: String,
        require: [true , "Password is require"]
    },
    
})

const User = mongoose.model("User" , userSchema)
module.exports = User