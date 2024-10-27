import { BASE_URL } from '../constants';
import { transformRoom } from '../transformers';

export const getRooms = () =>
  fetch(`${BASE_URL}rooms`)
    .then((loadedRooms) => loadedRooms.json())
    .then((rooms) => rooms.map(transformRoom));
