const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log(authHeader);
	if (!authHeader) {
		const error = new Error(
			'Not authenticated, because no token was provided.'
		);
		error.statusCode = 401;
		throw error;
	}
	const authHeaderParts = authHeader.split(' ');
	if (!authHeaderParts.length === 2) {
		return res.status(401).send({ error: 'Token malformatted' });
	}
	const [scheme, token] = authHeaderParts;
	if (!/^Bearer$/i.test(scheme)) {
		return res.status(401).send({ error: 'Token malformatted' });
	}
	jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
		console.log(decodedToken);
		if (err) {
			const error = new Error(
				'Not authenticated, because the token was malformatted.'
			);
			error.statusCode = 401;
			throw error;
		}
		req.userId = decodedToken.id;
		return next();
	});
};
