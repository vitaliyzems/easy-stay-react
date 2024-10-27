import { BASE_URL } from '../constants';
import { transformBooking } from '../transformers/transform-booking';

export const getBookings = () =>
  fetch(`${BASE_URL}bookings`)
    .then((loadedBookings) => loadedBookings.json())
    .then((bookings) => bookings.map(transformBooking));
