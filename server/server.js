const express = require("express");
const app = express();
const database = require("./config/database");
const cors = require("cors");

app.use(express.json());
app.use(cors({
    origin : "http://localhost:5173/",
    credentials : true
}))


database.connect();

const userRoutes = require("./routes/user");

app.use("/api/v1/user", userRoutes);

app.listen(3000, ()=>{console.log("server started at port 3000")});
