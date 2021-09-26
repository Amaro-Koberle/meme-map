const router = require('express').Router();
const { body } = require('express-validator');
const authControllers = require('../controllers/auth');

const User = require('../models/user');

// signup route
router.post(
	'/signup',
	// input validation
	[
		body('name')
			.trim()
			.not()
			.isEmpty()
			.withMessage('Name cannot be left empty.'),
		body('email')
			.isEmail()
			.withMessage('Invalid email address.')
			// check if email is already in use
			.custom((email, { req }) => {
				return User.findOne({ email: email }).then((user) => {
					if (user) {
						return Promise.reject('Email address is already in use.');
					}
				});
			})
			.normalizeEmail(),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long.'),
	],
	authControllers.signup
);

// login route
router.post('/login', authControllers.login);

// reset password route
router.post('/reset-password', authControllers.resetPassword);

module.exports = router;
