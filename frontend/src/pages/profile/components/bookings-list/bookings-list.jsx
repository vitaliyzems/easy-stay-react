import { useSelector } from 'react-redux';
import { selectUserBookings } from '../../../../selectors/select-user-bookings';
import { Booking } from '../booking/booking';
import styled from 'styled-components';

const BookingsListContainer = ({ className, userId }) => {
  const bookings = useSelector(selectUserBookings);

  if (!bookings || !bookings.length || !userId) {
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
