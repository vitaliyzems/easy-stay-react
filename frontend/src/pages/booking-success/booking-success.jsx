import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BookingSuccessContainer = ({ className }) => {
  return (
    <div className={className}>
      <h2>Поздравляем с успешным бронированием!</h2>
      <div className="links">
        <Link to="/">На главную</Link>
        <Link to="/profile">Мои бронирования</Link>
      </div>
    </div>
  );
};

export const BookingSuccess = styled(BookingSuccessContainer)`
  & .links {
    width: 300px;
    display: flex;
    justify-content: space-between;

    a {
      color: #007bff;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
