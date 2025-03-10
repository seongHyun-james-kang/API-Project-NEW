const jwt = require('jsonwebtoken');
const { User } = require('../db/models');

const setTokenCookie = (res, user) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }  // Token expires in 1 day
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });
};

const restoreUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return next();
    
    req.user = user;
    return next();
  } catch (err) {
    return next();
  }
};

const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};

module.exports = { setTokenCookie, restoreUser, requireAuth };
