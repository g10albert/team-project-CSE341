const router = require("express").Router();
const { ensureAuth } = require("../middleware/auth");

router.use("/api-docs", require("./swaggerRoutes"));
router.use("/auth", require("./authRoutes"));

router.use("/projects", ensureAuth, require("./projectRoutes"));
router.use("/tasks", ensureAuth, require("./taskRoutes"));
router.use("/users", ensureAuth, require("./userRoutes"));
router.use("/comments", ensureAuth, require("./commentRoutes"));
router.use("/tags", ensureAuth, require("./tagRoutes"));

module.exports = router;
