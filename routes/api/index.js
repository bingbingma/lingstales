const router = require("express").Router();
const commentRoutes = require("./comment");

// Book routes
router.use("/comment", commentRoutes);

module.exports = router;
