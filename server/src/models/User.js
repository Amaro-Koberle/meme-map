const mongoose = require('mongoose');

const User = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	displayName: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	bio: {
		type: String,
		default: '',
	},
	profilePicture: {
		type: String,
		default: '',
	},
});

module.exports = mongoose.model('users', User);
