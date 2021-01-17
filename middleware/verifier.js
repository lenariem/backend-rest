const User = require('../models/User');
const createError = require('http-errors');

const verifier = async (req, res, next) => {
  try {
    const { verifToken } = req.body;
    const user = await User.findByVerifToken(verifToken);
    if (!user)
      throw new createError(
        404,
        `Looks like this url is invalid.`
      );
    req.user = user.getPublicFields();
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = verifier;
