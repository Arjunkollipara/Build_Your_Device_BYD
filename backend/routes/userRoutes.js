const express = require('express');
const router = express.Router();
const User = require('../models/User');
const requireAuth = require('../middleware/requireAuth');
const { createUser, getUsers , updateUser , deleteUser, getMe} = require('../controller/userController');

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

module.exports = router;
