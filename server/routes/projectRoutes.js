const express = require('express');
const router = express.Router();
const {
  createProject, getProjects, getProjectById,
  updateProject, joinProject, toggleOpen
} = require('../controller/projectController');

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.post('/:id/join', joinProject);
router.put('/:id/toggle', toggleOpen);

module.exports = router;
