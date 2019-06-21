const router = require("express").Router();
const pageRoutes = require("./page");

// Page routes
router.use("/pages", pageRoutes);

module.exports = router;
