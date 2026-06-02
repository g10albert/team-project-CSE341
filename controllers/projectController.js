const Project = require("../models/Project");
const { validationResult } = require("express-validator");

// GET all
exports.getAllProjects = async (req, res) => {
  /* #swagger.tags = ['Project'] */
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ error: "Server Error: Fetching projects failed." });
  }
};

// GET single
exports.getProjectById = async (req, res) => {
  /* #swagger.tags = ['Project'] */
  try {
    const project = await Project.findById(req.params.id);
    if (!project)
      return res.status(404).json({ error: "Project record not found." });
    res.status(200).json(project);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID formatting supplied." });
  }
};

// POST create
exports.createProject = async (req, res) => {
  /* #swagger.tags = ['Project']
      #swagger.description = 'Create a new project workspace record.'
      #swagger.parameters['body'] = {
          in: 'body',
          description: 'Project fields template.',
          required: true,
          schema: { $ref: '#/definitions/ProjectInput' }
      }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(500).json({ error: "Server Error: Failed to create project." });
  }
};

// PUT update
exports.updateProject = async (req, res) => {
  /* #swagger.tags = ['Project']
      #swagger.parameters['body'] = {
          in: 'body',
          description: 'Project fields template.',
          required: true,
          schema: { $ref: '#/definitions/ProjectInput' }
      }
  */
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedProject)
      return res.status(404).json({ error: "Project record not found." });
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ error: "Failed to execute document update." });
  }
};

// DELETE
exports.deleteProject = async (req, res) => {
  /* #swagger.tags = ['Project'] */
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project)
      return res.status(404).json({ error: "Project record not found." });
    res.status(200).json({ message: "Project document successfully purged." });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete project." });
  }
};
