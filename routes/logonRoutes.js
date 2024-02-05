const express = require("express");
const router = express.Router();

const {
    logon,
    register,
    logoff,
} = require("../controllers/logon");

router.route("/register").post(register);
router.route("/logon").get(logon)
router.route("/logoff").get(logoff);

module.exports = router;