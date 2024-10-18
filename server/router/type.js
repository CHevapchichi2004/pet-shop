const Router = require("express");
const router = new Router();
const TypeController = require("../controllers/typeController");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.post("/", roleMiddleware("ADMIN"), TypeController.create);
router.get("/", TypeController.getAll);

module.exports = router;
