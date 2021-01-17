const User = require('../models/User');
const createError = require('http-errors');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const user = await User.findByToken(token);
    console.log('the user', user);
    if (!user) throw new createError.NotFound();

    req.user = user.getPublicFields();
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = auth;
