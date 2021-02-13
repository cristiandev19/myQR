const jwt = require('jsonwebtoken');
const { config } = require('../../config/index');

exports.signToken = (payload, secret = config.jwtSecretKey ) => {
  return jwt.sign(payload, secret, {
    expiresIn: config.authJwtExpireTime
  });
}

exports.verifyToken = (token, secret = config.jwtSecretKey) => {
  try {
    const verified = jwt.verify(token, secret);
    return {
      msj: 'Autentificado con exito',
      payload: verified
    }
  } catch (error) {
    return {
      msj: error.message || 'Problemas al verificar el token',
      error
    }
  }
}