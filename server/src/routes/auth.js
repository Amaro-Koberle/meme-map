const router = require('express').Router();
const authController = require('../controllers/auth');
const signupValidation = require('../validations/signupValidation');

router.post('/signup', signupValidation, authController.signup);
// router.post('/login', authController.login);
// router.put('/forgot-password', authController.forgotPassword);
// router.get('/reset/:token', authController.resetPassword);

module.exports = router;
