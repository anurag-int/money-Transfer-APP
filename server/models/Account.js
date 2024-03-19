const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model("Account", accountSchema);