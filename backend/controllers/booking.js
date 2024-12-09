const mongoose = require('mongoose');
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
    .populate('hotel')
    .populate('room')
    .sort({ start_date: -1 });

  return userBookings;
}

async function removeBooking(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid booking ID');
  }

  try {
    const result = await Booking.findByIdAndDelete(id);

    if (!result) {
      console.log('Booking not found');
      return { success: false, message: 'Booking not found' };
    }

    return { success: true, message: 'Booking successfully deleted' };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return { success: false, message: 'Error deleting booking' };
  }
}

module.exports = {
  addBooking,
  getUserBookings,
  removeBooking,
};
