import { BASE_URL } from '../constants';
import { transformHotel } from '../transformers';

export const getHotel = async (id) => {
  return await fetch(`${BASE_URL}hotels/${id}`)
    .then((loadedHotel) => loadedHotel.json())
    .then(transformHotel);
};
