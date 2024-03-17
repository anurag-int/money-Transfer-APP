const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected with DB"))
.catch((error) => console.log(error.message))
} 
