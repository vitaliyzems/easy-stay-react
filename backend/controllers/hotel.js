const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// find available hotels
async function findAvailableHotels(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const bookedRooms = await Booking.find({
    start_date: { $lt: endDate },
    end_date: { $gt: startDate },
  }).distinct('room');

  const availableRooms = await Room.find({ _id: { $nin: bookedRooms } });

  const availableHotelIds = availableRooms.map((room) => room.hotel);
  const availableHotels = await Hotel.find({ _id: { $in: availableHotelIds } });

  return availableHotels;
}

async function getHotelWithAvailableRooms(
  hotelId,
  startDateString,
  endDateString
) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const bookedRoomIds = await Booking.find({
    room: { $exists: true },
    start_date: { $lt: endDate },
    end_date: { $gt: startDate },
  }).distinct('room');

  const hotel = await Hotel.findById(hotelId)
    .populate({
      path: 'rooms',
      match: { _id: { $nin: bookedRoomIds } },
      select: '-hotel',
    })
    .populate({
      path: 'comments',
      populate: {
        path: 'user',
        select: 'name',
      },
      select: 'content createdAt',
      options: { sort: { createdAt: -1 } },
    })
    .lean();

  if (!hotel.comments) {
    hotel.comments = [];
  }

  return hotel;
}

module.exports = {
  findAvailableHotels,
  getHotelWithAvailableRooms,
};
