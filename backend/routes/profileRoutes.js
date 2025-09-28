const express = require('express');
const router = express.Router();
const { createOrUpdateProfile, getProfileByUserId, getProfileMe } = require("../controller/profileController");
const requireAuth = require('../middleware/requireAuth');


// POST or PUT → create/update profile
router.post("/", createOrUpdateProfile);

// GET → fetch profile for authenticated user
router.get("/me", requireAuth, getProfileMe);

// GET → fetch profile by userId
router.get("/:userId", getProfileByUserId);


module.exports = router;
