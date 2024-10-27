export const transformBooking = (dbBooking) => ({
  userId: dbBooking.user_id,
  hotelId: dbBooking.hotel_id,
  roomId: dbBooking.room_id,
  startDate: dbBooking.start_date,
  endDate: dbBooking.end_date,
  totalPrice: dbBooking.total_price,
  id: dbBooking.id,
});
