const express = require('express');

const router = express.Router({ mergeParams: true });

router.use('/', require('./auth'));
router.use('/hotels', require('./hotel'));
router.use('/bookings', require('./booking'));
router.use('/comments', require('./comment'));

module.exports = router;
