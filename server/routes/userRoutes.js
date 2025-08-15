const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { createUser, getUsers } = require('../controller/userController');

// @descriptiom    Create a new user
// @route   POST /api/users
router.post('/', createUser);

// @description    Get all users
// @route   GET /api/users
router.get('/', getUsers);

module.exports = router;
