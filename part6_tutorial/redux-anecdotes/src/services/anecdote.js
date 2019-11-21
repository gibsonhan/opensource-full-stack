import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const create = async (object) => {
    const newObject = {
        content: object,
        votes: 0
    }
    const response = await axios.post(baseURL, newObject)
    return response.data
}

const updateVote = async (id, object) => {
    const newObject = {
        ...object,
        votes: object.votes + 1
    }
    const response = await axios.put(baseURL + `/${id}`, newObject)
    return response.data
}

export default {
    getAll,
    create,
    updateVote
}