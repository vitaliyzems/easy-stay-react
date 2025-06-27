import { useEffect } from 'react';
import { HotelCard } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectHotels, selectHotelsLoading } from '../../selectors';
import { CLOSE_MODAL, loadHotelsAsync, openModal } from '../../actions';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SearchForm } from '../../components';
import { calculateDifferenceInDays, formatDate } from '../../utils';
import styled from 'styled-components';

const FoundedHotelsContainer = ({ className }) => {
  const [searchParams] = useSearchParams();
  const startDate = formatDate(searchParams.get('startDate'));
  const endDate = formatDate(searchParams.get('endDate'));
  const hotels = useSelector(selectHotels);
  const loading = useSelector(selectHotelsLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadHotelsAsync(startDate, endDate));
  }, [dispatch, startDate, endDate]);

  if (
    !Date.parse(startDate) ||
    !Date.parse(endDate) ||
    calculateDifferenceInDays(startDate, endDate) <= 0
  ) {
    dispatch(
      openModal({
        text: 'Ошибка! Неверно указаны даты. Повторите поиск!',
        onConfirm: () => {
          navigate('/');
          dispatch(CLOSE_MODAL);
        },
        onCancel: null,
      })
    );
    return;
  }

  return (
    <div className={className}>
      <SearchForm startDateProps={startDate} endDateProps={endDate} />
      {loading ? (
        <h2>Загрузка...</h2>
      ) : (
        <div className="hotels-list">
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              startDate={startDate}
              endDate={endDate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FoundedHotels = styled(FoundedHotelsContainer)`
  & .hotels-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 20px 0;
    gap: 20px;
  }
`;
