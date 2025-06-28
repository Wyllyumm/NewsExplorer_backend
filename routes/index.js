const router = require("express").Router();

const userRouter = require("./users.js");
const itemRouter = require("./clothingItems.js");
const NotFoundError = require("../errors/notFoundError.js");
const { login, createUser } = require("../controllers/users.js");
const {
  validateUserSignup,
  validateUserLogin,
} = require("../middlewares/validation.js");

router.use("/users", userRouter);
router.use("/items", itemRouter);
router.post("/signup", validateUserSignup, createUser);
router.post("/signin", validateUserLogin, login);

router.use(() => {
  throw new NotFoundError("Router not found");
});

module.exports = router;
