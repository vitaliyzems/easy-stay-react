import { Layout } from './components';
import { Route, Routes } from 'react-router-dom';
import {
  Auth,
  BookingConfirm,
  BookingSuccess,
  FoundedHotels,
  Hotel,
  Main,
  Profile,
} from './pages';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';

export const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData');

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(setUser(currentUserData));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/booking-confirm" element={<BookingConfirm />} />
        <Route path="/founded-hotels" element={<FoundedHotels />} />
        <Route path="/hotel/:id" element={<Hotel />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};
