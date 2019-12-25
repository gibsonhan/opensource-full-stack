import React from 'react'
import { connect } from 'react-redux'
import { logoutUser } from '../reducers/login'

import blogService from '../services/blogs'

const Logout = (props) => {
	
	const handleLogout = () => {
    window.localStorage.removeItem('LoggedInBlogUser')
    blogService.resetToken()
    props.logoutUser()
  }
	
	return(
		<span className="logout">
			<span>{props.user.name} logged in </span>
      <button onClick={() => handleLogout()}> Logout</button>
		</span>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	{logoutUser}
) (Logout)