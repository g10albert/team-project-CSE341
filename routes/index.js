const router = require('express').Router();
const { ensureAuth } = require('../middleware/auth');

router.use('/api-docs', require('./swaggerRoutes'));
router.use('/auth', require('./authRoutes'));

// Secure data collections with your security middleware
router.use('/projects', ensureAuth, require('./projectRoutes'));
router.use('/tasks', ensureAuth, require('./taskRoutes'));
router.use('/users', ensureAuth, require('./userRoutes'));
router.use('/comments', ensureAuth, require('./commentRoutes'));

module.exports = router;