const User = require('../models/user');

exports.getProfile = (req, res, next) => {
	User.findById(req.user._id);
};
