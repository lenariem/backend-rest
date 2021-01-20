const dotenv = require('dotenv');
dotenv.config();
const { env } = process;

/* const config = {
  env: env.NODE_ENV || 'development',
}; */

const config = {
  //replace with own mongo with Atlas
  db: process.env.db,
  env: env.NODE_ENV || 'development',
  jwt_key: process.env.jwt_key,
  ver_key: process.env.var_key,
  email: process.env.email,
  email_pass: process.env.email_pass
};

module.exports = config
