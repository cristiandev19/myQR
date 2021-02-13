const User = require("../../models/User");

exports.emailLogin = (req, res, next) => {
  try {
    
  } catch (error) {
    return next(error);
  }
}

exports.emailSignup = (req, res, next) => {
  try {
    const { names, lastNames, email, password } = req.body;
    // const user =
    const user = new User({ names, lastNames, email, password });
    // const result = auth_utils.signToken({ email, isLoged: true });
    user.save();
    console.log('user', user)
    return res.status(200).send({
      message: 'Funciono'
    })
  } catch (error) {
    return next(error);
  }
}

// const userSchema = new mongoose.Schema({
//   names              : String,
//   lastNames          : String,
//   email              : { type: String, unique: true },
//   password           : String,
//   // Cuando quieres cambiar la contraseña, se usa el Token
//   passwordResetToken : String,
//   emailVerified      : Boolean
// }, { timestamps: true });


