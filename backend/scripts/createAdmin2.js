// scripts/createAdmin2.js
// Usage: node scripts/createAdmin2.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../.env' });
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-collab';

async function createAdmin2() {
  await mongoose.connect(MONGO_URI);
  const email = 'admin2@campuscollab.com';
  const password = 'admin456';
  const name = 'Second Admin';

  let user = await User.findOne({ email });
  if (user) {
    user.role = 'admin';
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    console.log('Existing user promoted to admin and password reset:', email);
  } else {
    const hash = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hash, role: 'admin' });
    await user.save();
    console.log('Admin user created:', email, 'Password:', password);
  }
  mongoose.disconnect();
}

createAdmin2().catch(e => { console.error(e); process.exit(1); });
