import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blog'
import messageReducer from './reducers/notification'

const reducer = combineReducers({
	blogs: blogReducer,
	message: messageReducer,
})

const store = createStore(reducer, applyMiddleware(thunk));

export default store