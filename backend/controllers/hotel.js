const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking');
const Room = require('../models/Room');

// find available hotels
async function findAvailableHotels(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  // Находим все бронирования, пересекающиеся с заданным периодом
  const bookedRooms = await Booking.find({
    start_date: { $lt: endDate }, // Начало бронирования до конца периода поиска
    end_date: { $gt: startDate }, // Конец бронирования после начала периода поиска
  }).distinct('room');

  // Получаем все номера, кроме забронированных в указанный период
  const availableRooms = await Room.find({ _id: { $nin: bookedRooms } });

  // Находим отели, к которым относятся доступные номера
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

  // Находим занятые номера по указанным датам
  const bookedRoomIds = await Booking.find({
    room: { $exists: true },
    start_date: { $lt: endDate },
    end_date: { $gt: startDate },
  }).distinct('room');

  // Ищем отель по ID, исключая занятые номера из списка
  const hotel = await Hotel.findById(hotelId)
    .populate({
      path: 'rooms',
      match: { _id: { $nin: bookedRoomIds } }, // Исключаем занятые номера
      select: '-hotel', // Исключаем поле hotel, если оно присутствует в номерах
    })
    .lean();

  return hotel;
}

module.exports = {
  findAvailableHotels,
  getHotelWithAvailableRooms,
};
