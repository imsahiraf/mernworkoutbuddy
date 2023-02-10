import { combineReducers } from 'redux';
import auth from './AuthContext';
import workout from './WorkoutsContext';

export default combineReducers({
  auth,
  workout,
})