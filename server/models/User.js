const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30
    },
    firstName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 40
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
        maxLength : 40
    },
    password : {
        type : String,
        minLength : 50,
        required : true
    },
    token : {
        type : String
    }
})

module.exports = mongoose.model("User", userSchema);

