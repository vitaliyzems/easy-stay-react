import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { loadHotelAsync } from '../../actions/load-hotel-async';
import { selectHotel } from '../../selectors/select-hotel';
import { ACTION_TYPE } from '../../actions';
import { DESCRIPTION_TEXT } from '../../constants';
import { Comments, Room } from './components';
import styled from 'styled-components';

const HotelContainer = ({ className }) => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const hotel = useSelector(selectHotel);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadHotelAsync(id, startDate, endDate));

    return () => dispatch({ type: ACTION_TYPE.RESET_HOTEL });
  }, [dispatch, id, startDate, endDate]);

  return (
    <div className={className}>
      {hotel.loading ? (
        <h2>Загрузка...</h2>
      ) : (
        <>
          <div className="hotel-content">
            <img
              className="hotel-image"
              src={hotel.imageUrl}
              alt={hotel.name}
            />
            <div>
              <h3>{hotel.name}</h3>
              <h4>{hotel.address}</h4>
              <p>{DESCRIPTION_TEXT}</p>
            </div>
          </div>
          <h4>
            Доступные варианты c{' '}
            {new Date(startDate).toLocaleDateString('KZ-kz', {
              dateStyle: 'long',
            })}{' '}
            по{' '}
            {new Date(endDate).toLocaleDateString('KZ-kz', {
              dateStyle: 'long',
            })}
            :
          </h4>
          <div>
            {hotel.rooms.map((room) => (
              <Room
                room={room}
                key={room.id}
                hotel={hotel}
                startDate={startDate}
                endDate={endDate}
              />
            ))}
          </div>
          <Comments />
        </>
      )}
    </div>
  );
};

export const Hotel = styled(HotelContainer)`
  & .hotel-content {
    display: flex;
  }
  & .hotel-image {
    margin: 0 10px 10px 0;
  }
`;
