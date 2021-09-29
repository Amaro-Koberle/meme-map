const router = require('express').Router();
const settingsControllers = require('../controllers/settings');
const isAuth = require('../middleware/is-auth');

// settings route
router.get('/settings', isAuth, settingsControllers.getSettingsMenu);

module.exports = router;
