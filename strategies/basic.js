const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const User = require('../models/User');

// passport.use(
//   new BasicStrategy(async function(email, password, cb) {
//     try {
//       return cb(null, true);

//       // const user = await User.find({ email });

//       // if (!user) {
//       //   return cb(new Error('No existe el usuario'), false);
//       // }

//       // user.comparePassword(password, (err, isMatch) => {
//       //   if (err) {
//       //     return cb(err);
//       //   }
//       //   if (isMatch) {
//       //     console.log('user', user);
//       //     return cb(null, user);
//       //   }
//       // })
//     } catch (error) {
//       return cb(error);
//     }
//   })
);