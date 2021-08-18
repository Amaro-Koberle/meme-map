const throwError = (message = '', statusCode = 500) => {
	const err = new Error();
	err.message = message;
	err.statusCode = statusCode;
	throw err;
};

module.exports = throwError;
