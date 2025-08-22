const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
    skills: { type: [String], default: [] },
    bio:    { type: String, default: '' },
    links: {
      github:   { type: String, default: '' },
      linkedin: { type: String, default: '' },
      portfolio:{ type: String, default: '' },
    }
  },
  { timestamps: true }

);

module.exports = mongoose.model('User', userSchema);
