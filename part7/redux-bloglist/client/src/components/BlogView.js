import React from 'react'
import { connect } from 'react-redux'

import Comment from '../components/Comment'
import CommentList from '../components/CommentList'

import { vote } from '../reducers/blog'
import { addComment } from '../reducers/comment'
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
			<p>{blog.url}</p>
			<p>number of likes {blog.likes}</p>
			<p>Created by {blog.author}</p>
			<button onClick={handleLike}>Like</button>

			<h2>Comment Here</h2>
			{console.log(props.path)}
			{console.log(props)}
			<Comment numComment={props.comments.length} blogID={props.path}/>
			<CommentList comments={props.comments} />
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		comments: state.comments
	}
}

const mapDispatchToProps = {
	sendMessage,
	vote,
}

export default connect (
	mapStateToProps,
	mapDispatchToProps,
	) ( BlogView )