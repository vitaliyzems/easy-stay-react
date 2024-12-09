const express = require('express');
const {
  addBooking,
  getUserBookings,
  removeBooking,
} = require('../controllers/booking');
const mapBooking = require('../helpers/mapBooking');
const mapUserBooking = require('../helpers/mapUserBooking');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.post('/', authenticated, async (req, res) => {
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

router.get('/', authenticated, async (req, res) => {
  const userBookings = await getUserBookings(req.query.userId);

  res.send({ data: userBookings.map(mapUserBooking) });
});

router.delete(
  '/:id',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.USER]),
  async (req, res) => {
    const response = await removeBooking(req.params.id);

    res.send({ data: response });
  }
);

module.exports = router;
