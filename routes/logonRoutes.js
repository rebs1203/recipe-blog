const express = require("express");
const router = express.Router();

const {
    logon,
    register,
    logoff,
} = require("../controllers/logon");

router.route("/register").post(register);
router.route("/logon").post(logon)
router.route("/logoff").post(logoff);

module.exports = router;