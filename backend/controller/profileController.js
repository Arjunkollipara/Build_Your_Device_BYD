const Profile = require("../models/Profile") 

const createOrUpdateProfile = async (req, res) => {
  try {
    const {
      userId,
      bio = "",
      avatar = "",
      details = "",
      skills = [],
      links = {},
      achievements = [],
    } = req.body;

    // Clean up links: only set if valid or blank
    const cleanLinks = {
      github: links.github && links.github.match(/^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+$/) ? links.github : "",
      linkedin: links.linkedin && links.linkedin.match(/^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+$/) ? links.linkedin : "",
      portfolio: links.portfolio || "",
    };

    // Clean up skills/achievements: ensure arrays
    const safeSkills = Array.isArray(skills) ? skills : [];
    const safeAchievements = Array.isArray(achievements) ? achievements : [];

    let profile = await Profile.findOne({ userId });

    if (profile) {
      // update
      profile = await Profile.findOneAndUpdate(
        { userId },
        { bio, avatar, details, skills: safeSkills, links: cleanLinks, achievements: safeAchievements },
        { new: true }
      );
    } else {
      // create
      profile = new Profile({ userId, bio, avatar, details, skills: safeSkills, links: cleanLinks, achievements: safeAchievements });
      await profile.save();
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProfileByUserId = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getProfileMe = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { 
    createOrUpdateProfile,
    getProfileByUserId,
    getProfileMe };