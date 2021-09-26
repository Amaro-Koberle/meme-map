const router = require('express').Router();
const exploreControllers = require('../controllers/explore');

// explore route
router.get('/', exploreControllers.home);

module.exports = router;
