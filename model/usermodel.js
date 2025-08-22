const { default: mongoose} = require("mongoose")
//creating schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true, 
        select: false,
    },
    role:{
        type: String,
        enum:["professional", "admin"],
        default:"professional",
    },
    username : String,
});

const User = mongoose.model("user", userSchema);
module.exports = User;