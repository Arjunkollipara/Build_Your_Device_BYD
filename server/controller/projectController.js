const Project = require('../models/Project');
const User = require('../models/User');

// POST /api/projects
const createProject = async (req, res) => {
  try {
    const { title, description = '', requiredSkills = [], ownerId } = req.body;
    if (!title || !ownerId) return res.status(400).json({ message: 'title and ownerId are required' });

    const owner = await User.findById(ownerId);
    if (!owner) return res.status(404).json({ message: 'Owner not found' });

    const project = await Project.create({
      title, description, requiredSkills, owner: ownerId, members: [ownerId],
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/projects?isOpen=true&skill=React
const getProjects = async (req, res) => {
  try {
    const { isOpen, skill } = req.query;
    const q = {};
    if (isOpen !== undefined) q.isOpen = isOpen === 'true';
    if (skill) q.requiredSkills = { $in: [skill] };

    const projects = await Project.find(q)
      .populate('owner', 'name email')
      .populate('members', 'name email');
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    const p = await Project.findById(req.params.id)
      .populate('owner', 'name email')
      .populate('members', 'name email');
    if (!p) return res.status(404).json({ message: 'Project not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/projects/:id
const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/projects/:id/join  { userId }
const joinProject = async (req, res) => {
  try {
    const { userId } = req.body;
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Project not found' });
    if (p.members.some(m => m.toString() === userId))
      return res.status(400).json({ message: 'Already a member' });

    p.members.push(userId);
    await p.save();
    const populated = await p.populate('members', 'name email');
    res.json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/projects/:id/toggle
const toggleOpen = async (req, res) => {
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ message: 'Project not found' });
    p.isOpen = !p.isOpen;
    await p.save();
    res.json(p);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    joinProject,
    toggleOpen
    };