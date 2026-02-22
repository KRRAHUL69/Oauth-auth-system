const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const rateLimit = require("../middleware/rateLimit.middleware");

router.post("/register", rateLimit, authCtrl.register);
router.post("/login", rateLimit, authCtrl.login);
router.get("/me", authMiddleware, authCtrl.getMe);
router.post("/logout", authMiddleware, authCtrl.logout);

module.exports = router;