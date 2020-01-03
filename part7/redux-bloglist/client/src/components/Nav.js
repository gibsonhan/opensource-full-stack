import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Logout from '../components/Logout'

const Nav = (props) => {
	if(!props.user.token) {
		return <></>
	}
	return (
		<div className="nav_bar">
			<Link to="/blogs">blog</Link>
			<Link to="/users">user</Link>
			<Logout />
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
	null,
)(Nav)
