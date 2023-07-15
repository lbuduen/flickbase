const router = require("express").Router();
const auth = require("../middlewares/auth");
const UserController = require("../controllers/user.controller");

router
  .route("/profile")
  .get(auth("readOwn", "profile"), UserController.profile)
  .patch(auth("updateOwn", "profile"), UserController.updateProfile);

router.patch(
  "/email",
  auth("updateOwn", "profile"),
  UserController.updateUserEmail
);

router.get("/verify", UserController.verifyAccount);

module.exports = router;
