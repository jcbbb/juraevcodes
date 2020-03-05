const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  USER: process.env.EMAIL_USER,
  PASS: process.env.EMAIL_PASS,
};
