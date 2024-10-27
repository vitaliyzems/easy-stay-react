import { BASE_URL } from '../constants';

export const deleteBooking = async (bookingId) =>
  fetch(`${BASE_URL}bookings/${bookingId}`, {
    method: 'DELETE',
  });
