const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email              : { type: String, unique: true },
  password           : String,
  profile            : {
    names     : String,
    lastNames : String,
    picture   : { type: String, default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' },
  },
  // Cuando quieres cambiar la contraseña, se usa el Token
  passwordResetToken : String,
  emailVerified      : { type: Boolean, default: false }
}, { timestamps: true });

/**
 * Password hash middleware.
 * Middlewar sirve para antes de GUARDAR ALGO
 * Encripta la Contraseña si guardas la contraseña nueva.
 */
userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  // This es porque se aplica sobre el objeto que tienes;
  if (typeof this.password === 'undefined') {
    cb(false, '');
  }
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};
/**
 * Como se aplica
user.comparePassword(password, (err, isMatch) => {
  if (err) { return done(err); }
  if (isMatch) {
    // return done(null, user);
  }
  // return done(null, false, { msg: 'Invalid email or password.' });
});
 */

const User = mongoose.model('User', userSchema);

module.exports = User;
