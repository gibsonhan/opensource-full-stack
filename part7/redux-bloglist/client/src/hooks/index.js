import { useState } from 'react'

export const useField = (type) => {
	const [value, setValue] = useState('')
	
	const onChange = (event) => {
		setValue(event.target.value)
	}

	const reset = () => {
		setValue('')
	}

	const input = () => {
		return {
			type,
			value,
			onChange
		}
	}

	return {
		input,
		reset
	}
	
}

//module can have several name export
export const resetField = (hook) => {
	console.log(hook)
}

