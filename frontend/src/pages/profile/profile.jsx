import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUserId, selectUserName } from '../../selectors';
import { BookingsList } from './components';

const ProfileContainer = ({ className }) => {
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);

  return (
    <div className={className}>
      <h2>{userName}, список ваших бронирований:</h2>
      <BookingsList userId={userId} />
    </div>
  );
};

export const Profile = styled(ProfileContainer)`
  & h2 {
    margin: 0;
  }
`;
