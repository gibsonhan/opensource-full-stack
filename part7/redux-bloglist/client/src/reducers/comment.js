

export const addComment = (type, blogID, comment) => {
	const FIRST_COMMENT = 'ADD_FIRST_COMMENT'
	const ADD_COMMENT = 'ADD_COMMENT'
	let choice = (type === 'first') ? FIRST_COMMENT : ADD_COMMENT
	return {
		type: choice,
		payload: {
			blogID,
			comment,
		}
	}
}

const commentReducer = (state = {}, action) => {
	const payload = action.payload || {}
	switch(action.type) {
		case 'ADD_FIRST_COMMENT':
			let test = {
				...state,
				[payload.blogID]: [payload.comment]
			}
			return test

		case 'ADD_COMMENT':
			return {
				...state,
				[payload.blogID]: [...state[payload.blogID], payload.comment]
			}
		default:
			return state
	}
}

export default commentReducer