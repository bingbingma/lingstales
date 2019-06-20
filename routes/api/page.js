const router = require("express").Router();
const pageController = require("../../controllers/pageController");

router
  .route("/")
  .get(pageController.findAll)
  .post(pageController.create);

router
  .route("/:pid")
  .get(pageController.findById)
  .put(pageController.update)
  .delete(pageController.remove);

router.route("/:pid/comments/").post(pageController.createComment);

router
  .route("/:pid/comments/:cid")
  .get(pageController.findCommentById)
  .post(pageController.updateCommentById)
  .delete(pageController.removeComment);

module.exports = router;
