import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blog'
import notificationReducer from './reducers//notification'

const reducer = combineReducers({
	blogs: blogReducer,
})

console.log('inside store', reducer)
const store = createStore(reducer, applyMiddleware(thunk));

export default store