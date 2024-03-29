const express = require("express");
const app = express();
const database = require("./config/database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin : true,
    credentials : true
}))


database.connect();

const userRoutes = require("./routes/user");
const accountRoutes = require("./routes/account");

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/account", accountRoutes);

app.listen(3000, ()=>{console.log("server started at port 3000")});
