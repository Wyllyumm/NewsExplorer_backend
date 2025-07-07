const router = require("express").Router();

const {
  getItems,
  likeItem,
  dislikeItem,
} = require("../controllers/newsArticles.js");
const { validateItemId } = require("../middlewares/validation.js");

router.get("/", getItems);
router.put("/:itemId/likes", validateItemId, likeItem);
router.delete("/:itemId/likes", validateItemId, dislikeItem);

module.exports = router;
