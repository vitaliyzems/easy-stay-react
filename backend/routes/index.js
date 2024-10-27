const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/bookings', require('./booking'));
// router.use('/users', require('./user'));

module.exports = router;
