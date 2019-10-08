import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data) 
}
const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(res => res.data)
}

const remove = (id) => {
    const baseUrl = `http://localhost:3001/persons/${id}`
    return axios.delete(baseUrl)
}

export default { getAll, create, remove }