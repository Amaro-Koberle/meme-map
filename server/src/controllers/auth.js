const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const crypto = require('crypto');
const SendEmail = require('../utils/sendEmail');
const throwError = require('../utils/throwError');

exports.signup = (req, res, next) => {
	const credentials = req.body;
	User.findOne({ email: credentials.email })
		.then(async (doc) => {
			if (doc) throwError('User with this email already exists.');
			return bcrypt.hash(credentials.password, 12);
		})
		.then((hashPassword) =>
			User.create({
				email: credentials.email,
				password: hashPassword,
				displayName: credentials.displayName,
			})
		)
		.then((doc) => loginHandler(doc, req.headers['user-agent']))
		.then((user) => res.status(201).json(user))
		.catch(next);
};
