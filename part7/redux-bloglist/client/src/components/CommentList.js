import React from 'react'

const CommentList = (props) => {
	if(!props)
		return <></>
	console.log('comment list', props.comments)
	return (
		<h1></h1>
	)
}

export default CommentList