export const setFilterReducer = filter => {
    return {
        type: 'UPDATE_FILTER',
        data: filter
    }
}

const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'UPDATE_FILTER':
            return action.data
        default:
    }
    return state
}

export default filterReducer