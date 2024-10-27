import { BASE_URL } from '../constants';
import { transformBooking } from '../transformers/transform-booking';

export const addBooking = (
  userId,
  hotelId,
  roomId,
  startDate,
  endDate,
  totalPrice
) =>
  fetch(`${BASE_URL}bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({
      user_id: userId,
      hotel_id: hotelId,
      room_id: roomId,
      start_date: startDate,
      end_date: endDate,
      total_price: totalPrice,
    }),
  })
    .then((addedBooking) => addedBooking.json())
    .then(transformBooking);
