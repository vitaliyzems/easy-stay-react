const Booking = require('../models/Booking');

async function addBooking(booking) {
  const newBooking = await Booking.create(booking);

  return newBooking;
}

module.exports = {
  addBooking,
};
