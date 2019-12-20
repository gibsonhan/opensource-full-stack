import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blog'
import messageReducer from './reducers/notification'
import loginReducer from './reducers/login'

const reducer = combineReducers({
	blogs: blogReducer,
	message: messageReducer,
	user: loginReducer,
})

const store = createStore(reducer, applyMiddleware(thunk));

export default store