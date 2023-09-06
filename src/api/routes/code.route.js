const {Router} = require("express");
const { createCode } = require("../controllers/code.controller");
const { adminPage, codePage } = require("../controllers/auth.controller");
const router = Router();

router.get('/code', codePage)
router.post('/code', createCode);


module.exports = router;
