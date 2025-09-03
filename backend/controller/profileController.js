const Profile = require("../models/Profile") 

const createOrUpdateProfile = async (req, res) => {
  try {
    const { userId, bio, avatar, details, skills, links, achievements } = req.body;

    let profile = await Profile.findOne({ userId });

    if (profile) {
      // update
      profile = await Profile.findOneAndUpdate(
        { userId },
        { bio, avatar, details, skills, links, achievements },
        { new: true }
      );
    } else {
      // create
      profile = new Profile({ userId, bio, avatar, details, skills, links, achievements });
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


module.exports = { 
    createOrUpdateProfile,
    getProfileByUserId };