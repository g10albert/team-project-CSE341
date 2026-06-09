const Comment = require("../models/Comment");
const { validationResult } = require("express-validator");

exports.getAllComments = async (req, res) => {
  /* #swagger.tags = ['Comment'] */
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Server Error: Fetching comments failed." });
  }
};

exports.getCommentById = async (req, res) => {
  /* #swagger.tags = ['Comment'] */
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(404).json({ error: "Comment record not found." });
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID formatting supplied." });
  }
};

exports.createComment = async (req, res) => {
  /* #swagger.tags = ['Comment']
     #swagger.parameters['body'] = {
        in: 'body',
        description: 'Comment body structural config.',
        required: true,
        schema: { $ref: '#/definitions/CommentInput' }
     }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const newComment = new Comment({
      taskId: req.body.taskId,
      userId: req.user ? req.user._id : "60c72b2f9b1d8b2bad765432",
      text: req.body.text,
    });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: "Server Error: Failed to drop comment." });
  }
};

exports.updateComment = async (req, res) => {
  /* #swagger.tags = ['Comment']
    #swagger.parameters['body'] = {
        in: 'body',
        description: 'Updated comment payload.',
        required: true,
        schema: {
          type: 'object',
          properties: {
            text: { type: 'string', example: 'This is an updated comment text string.' }
          }
        }
    }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true },
    );
    if (!updatedComment)
      return res.status(404).json({ error: "Comment document not found." });
    res.status(200).json(updatedComment);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Invalid request payload or ID formatting." });
  }
};

exports.deleteComment = async (req, res) => {
  /* #swagger.tags = ['Comment'] */
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment)
      return res.status(404).json({ error: "Comment document not found." });
    res.status(200).json({ message: "Comment successfully deleted." });
  } catch (err) {
    res.status(400).json({ error: "Execution clear target mapping error." });
  }
};
