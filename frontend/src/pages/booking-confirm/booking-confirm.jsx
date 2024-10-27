import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequestServer } from '../../hooks';
import { createBookingAsync } from '../../actions';

const BookingConfirmContainer = ({ className }) => {
  const { state: booking } = useLocation();
  const { userId, hotel, room, startDate, endDate, totalPrice } = booking;

  const dispatch = useDispatch();
  const requestServer = useRequestServer();
  const navigate = useNavigate();

  const bookRoom = () => {
    dispatch(
      createBookingAsync(
        requestServer,
        userId,
        hotel.id,
        room.id,
        startDate,
        endDate,
        totalPrice
      )
    );
    return navigate('/booking-success');
  };

  return (
    <div className={className}>
      <h1 className="booking-title">Информация о бронировании</h1>

      <div className="hotel-info">
        <h2>
          Название отеля:{' '}
          <span className="hotel-name">Отель "{hotel.name}"</span>
        </h2>
        <p>
          Название комнаты: <span className="room-name">{room.type}</span>
          <img src={room.imageUrl} alt={room.type} />
        </p>
      </div>

      <div className="booking-details">
        <h3>Детали бронирования</h3>
        <p>
          Дата заезда:{' '}
          <span className="check-in-date">
            {new Date(startDate).toLocaleDateString('KZ-kz', {
              dateStyle: 'long',
            })}
          </span>
        </p>
        <p>
          Дата выезда:{' '}
          <span className="check-out-date">
            {new Date(endDate).toLocaleDateString('KZ-kz', {
              dateStyle: 'long',
            })}
          </span>
        </p>
        <p>
          Общая стоимость поездки:{' '}
          <span className="total-cost">{totalPrice} $</span>
        </p>
      </div>

      <div className="useful-info">
        <h3>Полезная информация</h3>
        <ul>
          <li>Бесплатный Wi-Fi на всей территории отеля.</li>
          <li>Бесплатный завтрак включен.</li>
          <li>Парковка доступна за дополнительную плату.</li>
          <li>Отмена бронирования за 48 часов до даты заезда.</li>
        </ul>
      </div>

      <div className="contact-info">
        <h3>Контактная информация</h3>
        <p>
          Телефон отеля: <span className="hotel-phone">+7 777 707 70 07</span>
        </p>
        <p>
          Email:{' '}
          <span className="hotel-email">
            info@{hotel.name.replace(/\s+/g, '').toLowerCase()}.kz
          </span>
        </p>
      </div>
      <div>
        <button onClick={bookRoom}>Забронировать</button>
      </div>
    </div>
  );
};

export const BookingConfirm = styled(BookingConfirmContainer)`
  width: 960px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  & .booking-title {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }

  & .hotel-info,
  & .booking-details,
  & .useful-info,
  & .contact-info {
    margin-bottom: 20px;
  }

  & h2,
  & h3 {
    color: #0056b3;
  }

  & .hotel-name,
  & .room-name,
  & .check-in-date,
  & .check-out-date,
  & .total-cost,
  & .hotel-phone,
  & .hotel-email {
    font-weight: bold;
    color: #333;
  }

  & ul {
    list-style-type: disc;
    padding-left: 20px;
  }

  & .booking-details p,
  & .useful-info ul,
  & .contact-info p {
    margin-bottom: 10px;
  }

  & .booking-container p {
    font-size: 1.1em;
  }

  & .booking-container ul li {
    font-size: 1em;
  }

  @media (max-width: 960px) {
    & .booking-container {
      width: 90%;
      padding: 15px;
    }
  }
`;
