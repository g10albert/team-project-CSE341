const Task = require("../models/Task");
const { validationResult } = require("express-validator");

// GET all tasks
exports.getAllTasks = async (req, res) => {
  /* #swagger.tags = ['Task'] */
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server Error: Fetching tasks failed." });
  }
};

// GET single task
exports.getTaskById = async (req, res) => {
  /* #swagger.tags = ['Task'] */
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task record not found." });
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID formatting supplied." });
  }
};

// POST create task
exports.createTask = async (req, res) => {
  /* #swagger.tags = ['Task']
      #swagger.description = 'Construct a brand-new task document linked to a project.'
      #swagger.parameters['body'] = {
          in: 'body',
          description: 'Task fields template.',
          required: true,
          schema: { $ref: '#/definitions/TaskInput' }
      }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: "Server Error: Failed to create task." });
  }
};

// PUT update task
exports.updateTask = async (req, res) => {
  /* #swagger.tags = ['Task']
      #swagger.parameters['body'] = {
          in: 'body',
          description: 'Task fields template.',
          required: true,
          schema: { $ref: '#/definitions/TaskInput' }
      }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTask)
      return res.status(404).json({ error: "Task record not found." });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json({ error: "Failed to execute document update." });
  }
};

// DELETE task
exports.deleteTask = async (req, res) => {
  /* #swagger.tags = ['Task'] */
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task record not found." });
    res.status(200).json({ message: "Task document successfully purged." });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete task." });
  }
};
