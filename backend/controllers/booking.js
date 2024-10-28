const Booking = require('../models/Booking');

async function addBooking(booking) {
  const newBooking = await Booking.create(booking);

  return newBooking;
}

async function getUserBookings(userId) {
  const userBookings = await Booking.find({ user: userId })
    .populate('hotel') // Расширяет поле hotel объектом отеля
    .populate('room'); // Расширяет поле room объектом комнаты

  return userBookings;
}

module.exports = {
  addBooking,
  getUserBookings,
};
