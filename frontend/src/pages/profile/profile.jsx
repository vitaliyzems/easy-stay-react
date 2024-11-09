import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectUserId, selectUserName } from '../../selectors';
import { BookingsList } from './components';
import { useEffect } from 'react';
import { loadUserBookingsAsync } from '../../actions';

const ProfileContainer = ({ className }) => {
  const userId = useSelector(selectUserId);
  const userName = useSelector(selectUserName);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(loadUserBookingsAsync(userId));
    }
  }, [dispatch, userId]);

  console.log(userId, userName);

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
