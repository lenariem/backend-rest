const bcrypt = require('bcryptjs');

exports.encrypt = async pass => {
  if (!pass) return '';
  return await bcrypt.hash(pass, 13);
};

exports.compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
