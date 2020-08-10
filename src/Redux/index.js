import { createStore } from 'redux';
import combinedReducers from './Reducers/combined';

export const store = createStore(combinedReducers);
