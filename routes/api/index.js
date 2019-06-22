const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users");

// Routes
router.use("/books", bookRoutes);

router.use("/user", userRoutes);

module.exports = router;
