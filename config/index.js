require('dotenv').config();

const config = {
  dev          : process.env.NODE_ENV !== 'production',
  port         : process.env.PORT || 3000,
  mongoConnect : process.env.MONGO_CONNECT,
  jwtSecretKey : process.env.JWT_SECRET_KEY
};

module.exports = { config };