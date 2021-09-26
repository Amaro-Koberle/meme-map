const crypto = require('crypto');
const User = require('../models/user');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

// Configure nodemailer to send via SendGrid
const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key: process.env.SENDGRID_API_KEY,
		},
	})
);

// signup controller
exports.signup = (req, res, next) => {
	// handling validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation failed');
		error.statusCode = 422;
		error.data = errors.array();
		throw error;
	}
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	// hash password
	bcrypt
		.hash(password, 12)
		.then((hashedPassword) => {
			// create user on database
			const user = new User({
				name: name,
				email: email,
				password: hashedPassword,
			});
			return user.save();
		})
		.then((result) => {
			res.status(201).json({ message: 'User created.', userId: result._id });
		})
		.then(() => {
			// send confirmation email
			return transporter
				.sendMail({
					to: email,
					from: 'amaro@amarokoberle.com',
					subject: 'Signup succeeded!',
					html: '<h1>You successfully signed up!</h1>',
				})
				.catch((err) => {
					if (!err.statusCode) {
						err.statusCode = 500;
					}
					next(err);
				});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

// login controller
exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser;
	// check if user exists in database
	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				const error = new Error('A user with this email could not be found.');
				error.statusCode = 401;
				throw error;
			}
			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})
		// check if password is correct
		.then((isEqual) => {
			if (!isEqual) {
				const error = new Error('Wrong password.');
				error.statusCode = 401;
				throw error;
			}
			// generate token
			const token = jwt.sign(
				{ email: loadedUser.email, userId: loadedUser._id.toString() },
				process.env.JWT_SECRET,
				{ expiresIn: '2h' }
			);
			res.status(200).json({ token: token, userId: loadedUser._id.toString() });
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

// reset password controller
exports.resetPassword = (req, res, next) => {
	console.log(req.body.email);
	// create random token
	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			console.log(err);
			const error = new Error('Internal server error');
			error.statusCode = 500;
			throw error;
		}
		const token = buffer.toString('hex');
		User.findOne({ email: req.body.email })
			.then((user) => {
				if (!user) {
					const error = new Error('No user with this email was found.');
					error.statusCode = 404;
					throw error;
				}
				user.resetToken = token;
				user.resetTokenExpiration = Date.now() + 3600000;
				return user.save();
			})
			.then((result) => {
				res.status(200).json({ message: 'Password reset link sent to email.' });
				// send password reset email
				transporter.sendMail({
					to: req.body.email,
					from: 'amaro@amarokoberle.com',
					subject: 'Password reset',
					html: `
						<p>You requested a password reset.</p>
						<h3>Click this link to reset your password:</h3>
						<h1><a href="http://localhost:3000/reset/${token}">Reset password</a></h1>
						<p>If you didn't request a password reset, someone else did.</p>
						<p>The reset link will expire in one hour.</p>
						`,
				});
			})
			.catch((err) => {
				if (!err.statusCode) {
					err.statusCode = 500;
				}
				next(err);
			});
	});
};
