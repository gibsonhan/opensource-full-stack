import React from 'react'
import { connect } from 'react-redux'

import { vote } from '../reducers/blog'
import { sendMessage } from '../reducers/notification'

const BlogView = (props) => {
	const blog = props.blogs.find(blog => blog.id === props.path)
	if(!blog) {
		return <></>
	}

	const handleLike = async () => {
		await props.vote(blog)
		props.sendMessage(`${blog.title} + 1 vote`, 'green', 6)
	}
	
	return (
		<div className="blog-view">
			<h2>{blog.title}</h2>
			<p>Created by {blog.author}</p>
			<p>{blog.url}</p>
			<p>number of likes {blog.likes}</p>
			<button onClick={handleLike}>Like</button>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs
	}
}

const mapDispatchToProps = {
	vote,
	sendMessage
}

export default connect (
	mapStateToProps,
	mapDispatchToProps,
	) ( BlogView )