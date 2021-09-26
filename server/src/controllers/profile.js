const User = require('../models/user');

exports.profile = (req, res, next) => {
	User.findById(req.user._id);
};
