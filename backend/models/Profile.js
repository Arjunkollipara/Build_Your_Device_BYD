const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // one profile per user
  },
  bio: {
    type: String,
    maxlength: 500,
  },
  avatar: {
    type: String, // store URL of the profile picture
  },
  details: {
    type: String, // more detailed description (like GitHub README)
    maxlength: 2000,
  },
  skills: {
    type: [String], // array of skills
    default: [],
  },
  links: {
    github: {
      type: String,
      match: [
        /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+$/,
        "Invalid GitHub URL",
      ],
    },
    linkedin: {
      type: String,
      match: [
        /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+$/,
        "Invalid LinkedIn URL",
      ],
    },
    portfolio: {
      type: String, // optional personal website/portfolio
    },
  },
  achievements: {
    type: [String], // list of achievements, badges, awards
    default: [],
  },
  selectedBadges: {
    type: [String], // badge ids selected by user
    default: [],
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
