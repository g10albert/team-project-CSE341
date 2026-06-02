const router = require('express').Router();
const projectController = require('../controllers/projectController');
const { check } = require('express-validator');

const validateProject = [
  check('projectName', 'Project name is explicitly required.').not().isEmpty(),
  check('description', 'Description field must be populated.').not().isEmpty()
];

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', validateProject, projectController.createProject);
router.put('/:id', validateProject, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;