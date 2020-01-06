import React from 'react'

const CommentList = (props) => {
	if(!props.comments)
		return <>No Comments</>

	return (
			<ul>
				{props.comments.map(comment => <li key={comment}>{comment}</li>)}
			</ul>
		)
}

export default CommentList