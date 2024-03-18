const express = require("express");
const router = express.Router();
const { balance, transfer } = require("../controllers/Transaction");
const { auth } = require("../Middleware/auth");

router.get("/balance", auth, balance);
router.post("/transfer", auth, transfer)


module.exports  = router;