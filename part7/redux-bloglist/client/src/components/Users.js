import React from 'react'
import { connect } from 'react-redux'

import Logout from '../components/Logout'
import { uniqueBlogs } from '../helper/userHelper';

const Users = (props) => {
	const blogs = uniqueBlogs(props.blogs)
	
	return (
		<div className='basic-info'>
			<h1>Users</h1>
			<Logout />
			<table>
				<thead>
					<tr>
						<th>Blogs by User</th>
						<th>Number of blogs</th>
					</tr>
				</thead>
				<tbody>
					{blogs.map(blog => <RowInfo key={blog.username} blog={blog} />)}
				</tbody>
			</table>
		</div>
	)
}

const RowInfo = (props) => {
	const {username, count} = props.blog
	return(
		<tr>
			<td>{username}</td>
			<td>{count}</td>
		</tr>
	)
}


const mapStateToProps = (state) => {
	return { 
		current : state.user,
		blogs: state.blogs,
	}
}

export default connect (
	mapStateToProps,
	null,
) ( Users )