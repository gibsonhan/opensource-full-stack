import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks';

import { addComment } from '../reducers/comment'

const Comment = (props) => {
	const commentBox = useField('text');
	const handleComment = (e) => {
		e.preventDefault()
		let string = commentBox.input().value 
		(props.numComments === 0)
			? props.addComment('first', props.blogID, string)	
		  : props.addComment('not_first', props.blogID, string)
	}
	return (
			<form onSubmit={handleComment}>
				<h1>Comment Here</h1>
				<input {...commentBox.input()}/>
				<button>Comment</button>
			</form>
	)
}

const mapDispatchToProps = {
	addComment
}
export default connect(
	null,
	mapDispatchToProps,
)(Comment);