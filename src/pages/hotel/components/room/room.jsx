import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal } from '../../../../actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectUserId } from '../../../../selectors';
import { calculateDifferenceInDays } from '../../../../utils';

const RoomContainer = ({ className, room, hotel, startDate, endDate }) => {
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const daysCount = calculateDifferenceInDays(startDate, endDate);
  const totalPrice = room.price * daysCount;

  const goToBookPageHandle = () => {
    if (!userId) {
      dispatch(
        openModal({
          text: 'Для продолжения необходимо авторизоваться',
          onConfirm: () => {
            navigate('/auth', { state: { from: location } });
            dispatch(CLOSE_MODAL);
          },
          onCancel: () => dispatch(CLOSE_MODAL),
        })
      );
      return;
    }

    navigate('/booking-confirm', {
      state: {
        userId,
        room,
        hotel,
        startDate,
        endDate,
        totalPrice,
      },
    });
  };

  return (
    <div className={className} key={room.id}>
      <div className="room-image">
        <img src={room.imageUrl} alt={room.type}></img>
      </div>
      <div className="room-content">
        <div className="room-info">
          <h4>{room.type}</h4>
          <span>Цена за ночь: {room.price} $</span>
          <span>
            Общая стоимость: {totalPrice} $ (кол-во суток: {daysCount})
          </span>
        </div>
        <div className="room-button-wrapper">
          <button onClick={goToBookPageHandle}>Забронировать</button>
        </div>
      </div>
    </div>
  );
};

export const Room = styled(RoomContainer)`
  display: flex;
  margin-bottom: 20px;
  box-shadow: 0 0 10px 0 #aaa;
  height: 200px;

  &:last-child {
    margin-bottom: 0;
  }

  & .room-image {
    width: 300px;
    margin-right: 20px;

    & img {
      width: 300px;
      height: 100%;
      object-fit: cover;
    }
  }

  & .room-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  & .room-info {
    display: flex;
    flex-direction: column;
    & span {
      margin-bottom: 10px;
    }
    & span:last-child {
      margin-bottom: 0;
    }
  }

  & .room-button-wrapper {
    display: flex;
    align-items: end;
    padding: 20px;
  }
`;
