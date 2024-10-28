const mapHotel = require('./mapHotel');
const mapRoom = require('./mapRoom');

module.exports = function (booking) {
  return {
    id: booking.id,
    startDate: booking.start_date,
    endDate: booking.end_date,
    totalPrice: booking.total_price,
    user: booking.user,
    hotel: mapHotel(booking.hotel),
    room: mapRoom(booking.room),
  };
};
