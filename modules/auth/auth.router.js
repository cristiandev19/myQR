const express = require('express');
const router = express.Router();

const auth_controller = require('./auth.controller');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router
.get('/emailLogin', auth_controller.emailLogin)
.post('/emailSignup', auth_controller.emailSignup);

module.exports = router;