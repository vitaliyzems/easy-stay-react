import { useDispatch, useSelector } from 'react-redux';
import { selectUserBookings } from '../../../../selectors/select-user-bookings';
import { useEffect } from 'react';
import { loadUserBookingsAsync } from '../../../../actions';
import { Booking } from '../booking/booking';
import styled from 'styled-components';

const BookingsListContainer = ({ className, userId }) => {
  const bookings = useSelector(selectUserBookings);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserBookingsAsync(userId));
  }, [dispatch, userId]);

  if (!bookings || !bookings.length) {
    return <h3>Загрузка...</h3>;
  }

  return (
    <div className={className}>
      {bookings.map(({ hotel, room, ...booking }) => (
        <Booking key={booking.id} booking={booking} hotel={hotel} room={room} />
      ))}
    </div>
  );
};

export const BookingsList = styled(BookingsListContainer)`
  padding-top: 20px;
`;
