const router = require("express").Router();
const pageController = require("../../controllers/pageController");

router
  .route("/")
  .get(pageController.findAll)
  .post(pageController.create);

router
  .route("/:id")
  .get(pageController.findById)
  .put(pageController.update)
  .delete(pageController.remove);

router
  .route("/:id/comments/")
  .get(pageController.findAllComments)
  .post(pageController.createComment);

router
  .route("/:id/comments/:cid")
  .get(pageController.findCommentById)
  .put(pageController.updateCommentById)
  .delete(pageController.removeComment);

module.exports = router;
