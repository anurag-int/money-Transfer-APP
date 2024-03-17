const express = require("express");
const router = express.Router();
const { signin, signup, updateInfo } = require("../controllers/User");

router.post("/signup", signup);
router.post("/signin", signin);
router.put("/update-info", updateInfo);


module.exports = router;