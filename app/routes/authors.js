const controller = require("../controllers/authors");
const router = require("express").Router();
const cacheNoStore = require("../middlewares/cacheNoStore");

router.get("/", controller.listAuthors);
router.get("/:id", controller.getAuthor);
router.post("/", controller.createAuthor);
router.patch("/:id", controller.updateAuthor);
router.delete("/:id", controller.deleteAuthor);

module.exports = router;
