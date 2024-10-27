import { BASE_URL } from '../constants';
import { transformHotel } from '../transformers';

export const getHotels = async (searchPhrase = '', page, limit = 0) =>
  await fetch(
    `${BASE_URL}hotels?name_like=${searchPhrase}&_page=${page}&_limit=${limit}`
  )
    .then((loadedHotels) => loadedHotels.json())
    .then((loadedHotels) => loadedHotels.map(transformHotel));
