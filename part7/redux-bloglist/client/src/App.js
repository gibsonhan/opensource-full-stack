import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import blogService from './services/blogs';

import BlogView from './components/BlogView';
import Login from './components/Login';
import Message from './components/Message';
import Users from './components/Users';

import BlogList from './components/BlogList';
import Nav from './components/Nav';
import UserView from './components/UserView';
import { get_initalBlogs } from './reducers/blog';
import { loginUser } from './reducers/login';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom';

const App = (props) => {
    useEffect(() => {
        const userTokenJSON = window.localStorage.getItem('LoggedInBlogUser');
    
        if(userTokenJSON) {
            props.get_initalBlogs();
            const userToken = JSON.parse(userTokenJSON); // this is seomthing I need to review
            blogService.setToken(userToken.token); 
            props.loginUser(userToken);
        }
        console.log();
    }, []);
  
    return (
        <div>
            <Message />
            <Router>
                <Nav />
                {(props.user.token) 
                    ? <Redirect to="/users" />
                    : <Route exact path= "/" render={()=><Login />} />
                }
                <Route exact path="/users" render={()=><Users />} />
                <Route exact path="/users/:id" render={({ match }) => <UserView path={match.params.id} />} />
                <Route exact path="/blogs" render={()=><BlogList />} />
                <Route exact path="/blogs/:id" render={({ match }) => <BlogView path={match.params.id} /> } />
            </Router>
        </div>
    );
};
const mapStateToProps = (state) => {
    return { 
        user: state.user,
    };
};

const mapDispatchToProps = {
    get_initalBlogs,
    loginUser,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
