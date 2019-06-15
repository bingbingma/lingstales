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

module.exports = router;
