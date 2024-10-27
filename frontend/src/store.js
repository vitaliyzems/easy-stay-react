import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import { thunk } from 'redux-thunk';
import {
  appReducer,
  bookingReducer,
  bookingsReducer,
  hotelReducer,
  hotelsReducer,
  userReducer,
} from './reducers';

const reducer = combineReducers({
  app: appReducer,
  booking: bookingReducer,
  bookings: bookingsReducer,
  hotel: hotelReducer,
  hotels: hotelsReducer,
  user: userReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));
