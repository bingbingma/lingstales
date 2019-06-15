const router = require("express").Router();
const pageRoutes = require("./page");

// Page routes
router.use("/page", pageRoutes);

module.exports = router;
