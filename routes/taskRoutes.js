const router = require('express').Router();
const taskController = require('../controllers/taskController');
const { check } = require('express-validator');

const validateTask = [
  check('projectId', 'Valid target Project ID reference required.').isMongoId(),
  check('taskName', 'Task name field is required.').not().isEmpty(),
  check('description', 'Task body details must be provided.').not().isEmpty(),
  check('dueDate', 'A clean calendar dead-line date field is required.').isISO8601()
];

router.get('/', taskController.getAllTasks);
router.get('/:id', taskController.getTaskById);
router.post('/', validateTask, taskController.createTask);
router.put('/:id', validateTask, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;