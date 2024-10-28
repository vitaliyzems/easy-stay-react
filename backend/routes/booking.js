const express = require('express');
const { addBooking, getUserBookings } = require('../controllers/booking');
const mapBooking = require('../helpers/mapBooking');
const mapUserBooking = require('../helpers/mapUserBooking');

const router = express.Router({ mergeParams: true });

router.post('/', async (req, res) => {
  const newBooking = await addBooking({
    start_date: req.body.startDate,
    end_date: req.body.endDate,
    total_price: req.body.totalPrice,
    user: req.body.user,
    hotel: req.body.hotel,
    room: req.body.room,
  });

  res.send({ data: mapBooking(newBooking) });
});

router.get('/', async (req, res) => {
  const userBookings = await getUserBookings(req.query.userId);

  res.send({ data: userBookings.map(mapUserBooking) });
});

module.exports = router;
