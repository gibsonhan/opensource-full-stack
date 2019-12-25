import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../components/Logout'

const Nav = () => {
	return (
		<div className="nav_bar">
			<Link to="/blogs">blog</Link>
			<Link to="/users">user</Link>
			<Logout />
		</div>
	)
}

export default Nav