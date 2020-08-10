import { createStore } from 'redux'
import combinedReducers from './Reducers/combined'

const store = createStore(combinedReducers)

export default store
