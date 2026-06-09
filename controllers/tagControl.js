const Tag = require('../models/Tag');
const { validationResult } = require('express-validator');

exports.getAllTags = async (req, res) => {
  /* #swagger.tags = ['Tag'] */
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: 'Server Error: Fetching tags failed.' });
  }
};

exports.getTagById = async (req, res) => {
  /* #swagger.tags = ['Tag'] */
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag not found.' });
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID formatting.' });
  }
};

exports.createTag = async (req, res) => {
  /* #swagger.tags = ['Tag']
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Tag configuration parameters.',
        required: true,
        schema: { $ref: '#/definitions/TagInput' }
     }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newTag = new Tag({
      tagName: req.body.tagName,
      colorHex: req.body.colorHex
    });
    const savedTag = await newTag.save();
    res.status(201).json(savedTag);
  } catch (err) {
    res.status(500).json({ error: 'Server Error: Duplicate or invalid tag entry.' });
  }
};

exports.updateTag = async (req, res) => {
  /* #swagger.tags = ['Tag']
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated tag fields.',
        required: true,
        schema: { $ref: '#/definitions/TagInput' }
     }
  */
  try {
    const updatedTag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedTag) return res.status(404).json({ error: 'Tag not found.' });
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json({ error: 'Invalid update inputs or formatting.' });
  }
};

exports.deleteTag = async (req, res) => {
  /* #swagger.tags = ['Tag'] */
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ error: 'Tag not found.' });
    res.status(200).json({ message: 'Tag cleanly removed.' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID formatting.' });
  }
};