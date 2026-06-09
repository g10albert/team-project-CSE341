const router = require('express').Router();
const tagController = require('../controllers/tagController');
const { check } = require('express-validator');

const validateTag = [
  check('tagName', 'Tag name is strictly required.').not().isEmpty()
];

router.get('/', tagController.getAllTags);
router.get('/:id', tagController.getTagById);
router.post('/', validateTag, tagController.createTag);
router.put('/:id', validateTag, tagController.updateTag);
router.delete('/:id', tagController.deleteTag);

module.exports = router;