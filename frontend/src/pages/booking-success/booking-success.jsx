import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BookingSuccessContainer = ({ className }) => {
  return (
    <div className={className}>
      <div>Успешно</div>
      <Link to="/">На главную</Link>
      <Link to="/profile">Мои бронирования</Link>
    </div>
  );
};

export const BookingSuccess = styled(BookingSuccessContainer)``;
