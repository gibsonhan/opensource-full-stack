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
		<div className="logout">
			<div>{props.user.name} logged in :
        <button onClick={() => handleLogout()}> Logout</button>
      </div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(
	mapStateToProps,
	{logoutUser }
) (Logout)