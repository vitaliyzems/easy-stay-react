import { useDispatch } from 'react-redux';
import {
  CLOSE_MODAL,
  openModal,
  removeBookingAsync,
} from '../../../../actions';
import styled from 'styled-components';

const BookingContainer = ({ className, booking, hotel, room }) => {
  const dispatch = useDispatch();

  const startDate = new Date(booking.startDate).toLocaleDateString('KZ-kz', {
    dateStyle: 'long',
  });
  const endDate = new Date(booking.endDate).toLocaleDateString('KZ-kz', {
    dateStyle: 'long',
  });

  const checkStatus = () => {
    if (Date.parse(booking.startDate) > Date.now()) {
      return 'upcoming';
    } else if (
      Date.parse(booking.startDate) <= Date.now() &&
      Date.parse(booking.endDate) >= Date.now()
    ) {
      return 'inprogress';
    } else {
      return 'completed';
    }
  };

  const onBookingCancel = () => {
    dispatch(
      openModal({
        text: 'Вы уверены что хотите отменить бронирование?',
        onConfirm: () => {
          dispatch(removeBookingAsync(booking.id));
          dispatch(CLOSE_MODAL);
        },
        onCancel: () => dispatch(CLOSE_MODAL),
      })
    );
    return;
  };

  return (
    <div className={className}>
      <div className="hotel-image">
        <img src={hotel.imageUrl} alt={hotel.name} />
      </div>
      <div className="booking-content">
        <div className="room-info">
          <h4>{hotel.name}</h4>
          <h4>{room.type}</h4>
          <span className="book-dates">
            {startDate} - {endDate}
          </span>
          <span className="total-price">$ {booking.totalPrice}</span>
          {checkStatus() === 'upcoming' && (
            <span className="status upcoming">Предстоящее</span>
          )}
          {checkStatus() === 'inprogress' && (
            <span className="status inprogress">В процессе</span>
          )}
          {checkStatus() === 'completed' && (
            <span className="status completed">Завершено</span>
          )}
        </div>
        {checkStatus() === 'upcoming' && (
          <div className="room-button-wrapper">
            <button onClick={onBookingCancel}>Отменить</button>
          </div>
        )}
      </div>
    </div>
  );
};

export const Booking = styled(BookingContainer)`
  display: flex;
  height: 180px;
  box-shadow: 0 0 10px 0 #aaa;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  & .hotel-image {
    height: 100%;
    margin-right: 20px;

    & img {
      height: 100%;
    }
  }

  & .booking-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  & .room-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 0;
  }

  & h4 {
    margin: 0;
  }

  & .status {
    border-radius: 5px;
    width: fit-content;
    padding: 5px 10px;
  }

  & .upcoming {
    background-color: #7fc7af;
    color: #fff;
  }

  & .inprogress {
    background-color: #c8ce03;
    color: #fff;
  }

  & .completed {
    background-color: #909090;
    color: #000;
  }

  & .room-button-wrapper {
    align-self: flex-end;
    padding: 10px;

    & button {
      background-color: #ea4545;
      padding: 10px 20px;
      border-radius: 5px;
      border: none;
      color: white;
      cursor: pointer;

      &:hover {
        background-color: #fff;
        border: 1px solid #ea4545;
        color: #000;
      }
    }
  }
`;
