const Router = require("express");
const router = new Router();
const redisMiddleware = require("../middlewares/cacheMiddleware");
const DeviceController = require("../controllers/deviceContrrolle");

router.post("/", DeviceController.create);
router.get("/", redisMiddleware("allDevice"), DeviceController.getAll);
router.get("/:id", DeviceController.getOne);

module.exports = router;
