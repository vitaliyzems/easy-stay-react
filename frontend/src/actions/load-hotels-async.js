import { ACTION_TYPE } from './action-type';

export const loadHotelsAsync =
  (
    requestServer,
    startDate = null,
    endDate = null,
    searchPhrase = '',
    page = 1
  ) =>
  (dispatch) =>
    requestServer('fetchHotels', startDate, endDate, searchPhrase, page).then(
      ({ res: hotels }) =>
        dispatch({ type: ACTION_TYPE.SET_HOTELS, payload: hotels })
    );
