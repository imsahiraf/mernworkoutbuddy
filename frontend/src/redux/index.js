import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import workoutsReducer from './WorkoutsReducer';

export default combineReducers({
  authReducer,
  workoutsReducer,
})