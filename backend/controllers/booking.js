const Booking = require('../models/Booking');

async function addBooking(booking) {
  const newBooking = await Booking.create(booking);

  return newBooking;
}

async function getUserBookings(userId) {
  if (!userId) {
    throw new Error('Invalid userId: userId cannot be null or undefined');
  }

  const userBookings = await Booking.find({ user: userId })
    .populate('hotel') // Расширяет поле hotel объектом отеля
    .populate('room') // Расширяет поле room объектом комнаты
    .sort({ start_date: -1 });

  return userBookings;
}

module.exports = {
  addBooking,
  getUserBookings,
};
