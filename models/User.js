
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  names              : String,
  lastNames          : String,
  email              : { type: String, unique: true },
  password           : String,
  // Cuando quieres cambiar la contraseña, se usa el Token
  passwordResetToken : String,
  emailVerified      : Boolean
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

module.exports = User;
