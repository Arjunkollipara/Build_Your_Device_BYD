const express = require('express');
const router = express.Router();
const {
  createProject, getProjects, getProjectById,
  updateProject, joinProject, toggleOpen, deleteProject
} = require('../controller/projectController');

const requireAuth = require('../middleware/requireAuth');


router.delete('/:id', requireAuth, deleteProject);
router.post('/', requireAuth, createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', requireAuth, updateProject);
router.post('/:id/join', requireAuth, joinProject);
router.put('/:id/toggle', requireAuth, toggleOpen);

module.exports = router;
