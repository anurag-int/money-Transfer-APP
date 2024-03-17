const express = require("express");
const router = express.Router();
const { signin, signup, updateInfo, bulk } = require("../controllers/User");
const { auth } = require("../Middleware/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/update-info", auth, updateInfo);
router.get("/bulk", bulk);


module.exports = router;