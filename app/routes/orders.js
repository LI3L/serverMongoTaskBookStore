const controller = require("../controllers/orders");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.get("/", controller.listOrders);
router.get("/:id", controller.getOrder);
router.get("/maxTotalPrice/:start/:end", controller.getMaxTotalPrice);
router.get("/mostPopularGeners/:start/:end", controller.getMostPopularGeners);
router.get("/sumTotalPrice/:start/:end", controller.getSumTotalPrice);
router.get("/most5PopularAuthors/:start/:end", controller.getMost5PopularAuthors);
router.post("/", controller.createOrder);
router.patch("/:id", controller.updateOrder);
router.delete("/:id", controller.deleteOrder);

module.exports = router;
