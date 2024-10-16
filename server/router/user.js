const Router = require("express");
const router = new Router();
const UserController = require("../controllers/userControllerr");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/auth", authMiddleware, UserController.check);

module.exports = router;
