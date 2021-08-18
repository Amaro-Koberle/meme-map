const router = require('express').Router();

router.get('/', (req, res, next) => {
	res.json({ message: 'Server is runnung' });
});

router.use('/auth', require('./auth'));

module.exports = router;
