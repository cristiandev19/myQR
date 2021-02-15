const jwt = require('jsonwebtoken');
const { config } = require('../../config/index');
const ms = require('ms');

exports.signToken = (user, secret = config.jwtSecretKey ) => {
  console.log('user', user)
  const _id = user._id;
  const expiresIn = config.authJwtExpireTime;

  const payload = {
    sub: _id,
    iat: Date.now()
  };
  console.log('payload', payload)
  const signedToken = jwt.sign(payload, secret, {
    expiresIn: expiresIn
  });
  // const expira = ms(expiresIn);
  // console.log('expira', expira)
  return {
    token: "Bearer " + signedToken,
    expires: ms(expiresIn)
  }
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

