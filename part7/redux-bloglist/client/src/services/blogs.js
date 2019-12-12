import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  console.log(newObject)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async(objectID, updateObject) => {
  const updateUrl = baseUrl + `/${objectID}`
  const response = await axios.put(updateUrl, updateObject)
  return response.data
}

const remove = async(objectID) => {
  const config = {
    headers: { Authorization: token }
  }
  const removeUrl = baseUrl + `/${objectID}`
  const response = await axios.delete(removeUrl, config)
  return response.data
}
const resetToken = () => {
  token = null
}

const setToken = newToken => {
  token =  `bearer ${newToken}`
}

export default { 
  getAll, 
  setToken,
  resetToken,
  create,
  update,
  remove
 }