import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HotelCardContainer = ({
  className,
  hotel: { id, name, address, imageUrl },
  startDate,
  endDate,
  preview = false,
}) => {
  return preview ? (
    <div className={className}>
      <img src={imageUrl} alt={imageUrl} />
      <div className="card-footer">
        <h4>{name}</h4>
        <p>{address}</p>
      </div>
    </div>
  ) : (
    <Link
      to={`/hotel/${id}?startDate=${startDate}&endDate=${endDate}`}
      className={className}
    >
      <img src={imageUrl} alt={imageUrl} />
      <div className="card-footer">
        <h4>{name}</h4>
        <p>{address}</p>
      </div>
    </Link>
  );
};

export const HotelCard = styled(HotelCardContainer)`
  box-shadow: 0 0 10px 0 #aaa;
  color: #000;

  & img {
    width: calc((960px - 40px) / 3);
  }

  & .card-footer {
    padding: 0 10px;
  }
`;
