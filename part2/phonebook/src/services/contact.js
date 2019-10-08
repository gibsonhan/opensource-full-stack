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
    const deleteUrl = baseUrl + `/${id}`
    return axios.delete(deleteUrl)
}

const update = (id, newObj) => {
    const updateUrl = baseUrl + `/${id}`
    const request = axios.put(updateUrl, newObj)
    return request.then(res => res.data)
}

export default { getAll, create, remove, update }