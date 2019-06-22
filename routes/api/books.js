const router = require("express").Router();
const bookController = require("../../controllers/bookController");

router
  .route("/")
  .get(bookController.findAll)
  .post(bookController.create);

router
  .route("/:id")
  .get(bookController.findById)
  .put(bookController.update)
  .delete(bookController.remove);

router
  .route("/:id/comments/")
  .get(bookController.findAllComments)
  .post(bookController.createComment);

router
  .route("/:id/comments/:cid")
  .get(bookController.findCommentById)
  .put(bookController.updateCommentById)
  .delete(bookController.removeComment);

module.exports = router;
