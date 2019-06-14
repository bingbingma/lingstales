const router = require("express").Router();
const pageRoutes = require("./page");

// Book routes
router.use("/page", pageRoutes);

module.exports = router;
