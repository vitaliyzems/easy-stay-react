import { BASE_URL } from '../constants';
import { transformRoom } from '../transformers';

export const getHotelRooms = (id) =>
  fetch(`${BASE_URL}rooms?hotel_id=${id}`)
    .then((loadedRooms) => loadedRooms.json())
    .then((rooms) => rooms.map(transformRoom));
