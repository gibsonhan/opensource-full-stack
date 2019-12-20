export const clearMessage = () => {
	return async dispatch => {
		await setTimeout(() => {
			dispatch({
				type: 'CLEAR_MESSAGE'
			})
		}, 10000)
	}
}

export const sendMessage = (message, color) => {
	return (dispatch) => {
		dispatch({
			type: 'CREATE_MESSAGE',
			payload: {
				message,
				color
			}
		})
		setTimeout(() => {
			dispatch({
				type: 'CLEAR_MESSAGE' 
			})
		}, 5000)
	}
}

const messageReducer = (state = '', action) => {
	switch(action.type) {
		case 'CREATE_MESSAGE':
			return action.payload 
		case 'CLEAR_MESSAGE':
			return '';
		default:
			return state
 }
}

export default messageReducer;