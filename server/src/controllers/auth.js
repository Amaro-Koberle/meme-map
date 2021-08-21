const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const crypto = require('crypto');
const SendEmail = require('../utils/sendEmail');
const throwError = require('../utils/throwError');

const loginHandler = ({ email, displayName, createdAt, _id }, device) => {
	const date = new Date();
	date.setDate(date.getDate() + 1);

	const token = jwt.sign({ email, displayName, createdAt, device, userId: _id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
	return { userId: _id, token, email, displayName, createdAt, expiresIn: date - new Date().getTime() }
}

exports.signup = (req, res, next) => {
	const credentials = req.body;
	User.findOne({ email: credentials.email })
		.then(async (doc) => {
			if (doc) throwError('User with this email already exists.');
			return bcrypt.hash(credentials.password, 12);
		})
		.then(hashPassword =>
			User.create({
				email: credentials.email,
				password: hashPassword,
				displayName: credentials.displayName,
				username: credentials.username
			})
		)
		.then(doc => loginHandler(doc, req.headers['user-agent']))
		.then(user => res.status(201).json(user))
		.catch(next);
};
