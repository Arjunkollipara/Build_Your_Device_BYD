const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getProfileByUserId } = require("../controller/profileController");


// POST or PUT → create/update profile
router.post("/", createOrUpdateProfile);

// GET → fetch profile by userId
router.get("/:userId", getProfileByUserId);

module.exports = router;
