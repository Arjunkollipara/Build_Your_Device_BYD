// scripts/createAdmin.js
// Usage: node scripts/createAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-collab';

async function createAdmin() {
  await mongoose.connect(MONGO_URI);
  const email = 'admin@campuscollab.com';
  const password = 'admin123';
  const name = 'Default Admin';

  // Remove any duplicate admin users with the same email
  const duplicates = await User.find({ email });
  if (duplicates.length > 1) {
    // Keep the first, remove the rest
    for (let i = 1; i < duplicates.length; i++) {
      await User.deleteOne({ _id: duplicates[i]._id });
      console.log('Removed duplicate admin user:', duplicates[i]._id);
    }
  }
  let user = await User.findOne({ email });
  const hash = await bcrypt.hash(password, 10);
  if (user) {
    user.role = 'admin';
    user.password = hash;
    await user.save();
    console.log('Existing user promoted to admin and password reset:', email);
  } else {
    user = new User({ name, email, password: hash, role: 'admin' });
    await user.save();
    console.log('Admin user created:', email, 'Password:', password);
  }
  mongoose.disconnect();
}

createAdmin().catch(e => { console.error(e); process.exit(1); });
