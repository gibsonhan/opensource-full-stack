import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import testReducer from './reducers/test'

const reducer = testReducer;
const store = createStore(reducer, applyMiddleware(thunk));

export default store