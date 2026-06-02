const router = require("express").Router();
const projectRoutes = require("./projectRoutes");
const taskRoutes = require("./taskRoutes");

// API Documentation Hook
router.use("/api-docs", require("./swaggerRoutes"));

// Resource Application Routes
router.use("/projects", projectRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
