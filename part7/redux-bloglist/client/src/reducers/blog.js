import blogService from '../services/blogs'

export const test = (input) => {
	return {
		type: 'test',
		payload: input
	}
}

export const get_initalBlogs = () => {
	return async dispatch => {
		const blogs = await blogService.getAll()
		dispatch({
			type: 'INITAL_BLOGS',
			payload: blogs
		})
	}
}

export const vote = (object) => {
	return async dispatch => {
		const  newObject = {
			...object,
			likes: object.likes + 1
		}
		const response = await blogService.update(object.id, newObject)
		dispatch({
			type: 'LIKE_BLOG',
			payload: response
		})
	}
}

export const create = (object) => {
	return async dispatch => {
		const response = await blogService.create(object)
		console.log('inside dispatch', response)
		dispatch({
			type: 'CREATE_BLOG',
			payload: response
		})
	}
}

export const remove = (object) => {
	return async dispatch => {
		const response = await blogService.remove(object.id)
		dispatch({
				type: 'REMOVE_BLOG',
				payload: {
					response,
					id: object.id
				},
			})
	}
}

const blogReducer = (state = [], action) => {
	switch(action.type) {
		case 'INITAL_BLOGS':
			return action.payload
		case 'LIKE_BLOG':
			const id = action.payload.id
			const object = state.find(ele => ele.id === id)	
			const updateObject = {
				...object,
				likes: object.likes+1
			}
			return state.map(object =>
				object.id === id ? updateObject : object)
		
		case 'CREATE_BLOG':
			return [...state, action.payload]
		 
		case 'REMOVE_BLOG':
			return state.filter(object => object.id !== action.payload.id)
		
		default:
			return state
	}
}

export default blogReducer;