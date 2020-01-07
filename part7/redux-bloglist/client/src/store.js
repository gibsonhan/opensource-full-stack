import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import blogReducer from './reducers/blog';
import commentReducer from './reducers/comment';
import messageReducer from './reducers/notification';
import loginReducer from './reducers/login';

const reducer = combineReducers({
    blogs: blogReducer,
    comments: commentReducer,
    message: messageReducer,
    user: loginReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;