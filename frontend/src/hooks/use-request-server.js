import { useCallback } from 'react';
import { server } from '../bff';
import { useSelector } from 'react-redux';
import { selectUserSession } from '../selectors';

export const useRequestServer = () => {
  const session = useSelector(selectUserSession);

  return useCallback(
    (operation, ...params) => {
      const request = [
        'signUp',
        'fetchHotels',
        'fetchHotel',
        'fetchHotelRooms',
      ].includes(operation)
        ? params
        : [session, ...params];

      return server[operation](...request);
    },
    [session]
  );
};
