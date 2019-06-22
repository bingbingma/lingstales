const router = require("express").Router();
const bookRoutes = require("./book");
const userRoutes = require("./user");

// Routes
router.use("/book", bookRoutes);

router.use("/user", userRoutes);

module.exports = router;
