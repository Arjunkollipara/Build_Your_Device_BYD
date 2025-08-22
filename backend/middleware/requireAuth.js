const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [, token] = header.split(' '); // "Bearer <token>"

    if (!token) return res.status(401).json({ message: 'No token' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // attach full user doc (be mindful in prod)
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
