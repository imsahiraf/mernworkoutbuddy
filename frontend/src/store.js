import { configureStore, createStore, combineReducers } from 'redux'
import redux from './redux';

// export default configureStore({
//   reducer: {},
// })

const store = createStore(
    redux
);

export default store;