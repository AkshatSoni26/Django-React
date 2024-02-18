import { applyMiddleware } from 'redux';
import {configureStore} from '@reduxjs/toolkit'
import rootReducer from './reducers'; 

// Create store with middleware
const store = configureStore({
  reducer:rootReducer,
}
);

export default store;
