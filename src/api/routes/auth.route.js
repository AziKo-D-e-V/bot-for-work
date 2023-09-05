const {Router} = require("express");
const {login, loginGet, admin, adminPage} = require("../controllers/auth.controller");

const router = Router();

router.post("/auth/login", login);
router.get("/", loginGet);
router.get("/admin", adminPage);


module.exports = router;
