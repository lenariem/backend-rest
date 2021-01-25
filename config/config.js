const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join( __dirname, ".env") })

const { env } = process;

const config = {
  db: process.env.db,
  env: env.NODE_ENV || 'development',
  jwt_key: process.env.jwt_key,
  ver_key: process.env.var_key,
  email: process.env.email,
  email_pass: process.env.email_pass,
  frontend_url: process.env.frontend_url
};

module.exports = config

