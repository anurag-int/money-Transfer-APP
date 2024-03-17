const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true,
        trim : true
    },
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    token : {
        type : String
    }
})

module.exports = mongoose.model("User", userSchema);

