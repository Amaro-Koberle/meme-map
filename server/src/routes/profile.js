const router = require('express').Router();
const profileControllers = require('../controllers/profile');
const isAuth = require('../middleware/is-auth');

// my-profile route
router.get('/profile', isAuth, profileControllers.profile);

module.exports = router;
