const createError = require('http-errors');

const isAdmin = (req, res, next) => {
  console.log(req.user);
  const role = req.user.role;
  console.log('the role', req.user);
  if (role !== 'Admin') throw new createError.NotFound();
  next();
};

module.exports = isAdmin;
