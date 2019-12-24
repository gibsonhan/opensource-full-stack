import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import blogService from './services/blogs'

import Login from './components/Login'
import Message from './components/Message'
import Users from './components/Users'

import BlogList from './components/BlogList'

import { get_initalBlogs } from './reducers/blog'
import { loginUser } from './reducers/login'

import {
  BrowserRouter as Router, 
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

const App = (props) => {

  useEffect(() => {
    const userTokenJSON = window.localStorage.getItem('LoggedInBlogUser')
    if(userTokenJSON) {
      props.get_initalBlogs()
      const userToken = JSON.parse(userTokenJSON) // this is seomthing I need to review
      blogService.setToken(userToken.token) 
      props.loginUser(userToken)
    }
  }, [])

  return (
    <div>
    <Message />
    <Router>
    {(!props.user.token) 
      ? <Route path = "/" render={() => <Login /> } /> 
      : <Route path = "/users" render={() => <Users /> } />
    }
      </Router>
    </div>
  )
}
const mapStateToProps = (state) => {
  return { user: state.user }
}

const mapDispatchToProps = {
  get_initalBlogs,
  loginUser,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  )(App)
