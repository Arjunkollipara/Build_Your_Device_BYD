const express = require('express');
const router = express.Router();
const User = require('../models/User');
const requireAuth = require('../middleware/requireAuth');
const { createUser, getUsers , updateUser , deleteUser, getMe} = require('../controller/userController');

// Promote user to admin (admin only)
router.patch('/promote/:id', requireAuth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.role = 'admin';
  await user.save();
  res.json({ message: 'User promoted to admin', user });
});

// Ban user for not following community guidelines (admin only)
router.patch('/ban/:id', requireAuth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.banned = true;
  user.banReason = 'Not following community guidelines';
  await user.save();
  res.json({ message: 'User banned', user });
});
// @descriptiom    Create a new user
// @route   POST /api/users
router.post('/', createUser);

// @description    Get all users
// @route   GET /api/users
router.get('/', getUsers);

// @description    Update user
// @route   PUT /api/users/:id
router.put('/:id', updateUser);

// @description    Delete user
// @route   DELETE /api/users/:id
router.delete('/:id', deleteUser);

// @description    Get current user
// @route   GET /api/users/me
router.get('/me', requireAuth, getMe);

// TEMPORARY: List all users for debugging
router.get('/debug/all', async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

module.exports = router;
