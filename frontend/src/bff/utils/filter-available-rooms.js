export const filterAvailableRooms = (
  rooms,
  bookings,
  checkInDate,
  checkOutDate
) => {
  const newStart = new Date(checkInDate);
  const newEnd = new Date(checkOutDate);

  return rooms.filter((room) => {
    return bookings.every((booking) => {
      if (booking.roomId !== room.id) {
        return true;
      }

      const bookedStart = new Date(booking.startDate);
      const bookedEnd = new Date(booking.endDate);

      // Проверка на пересечение дат
      return newEnd <= bookedStart || newStart >= bookedEnd;
    });
  });
};
