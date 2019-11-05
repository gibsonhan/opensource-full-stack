import React, {useState} from 'react'

import blogService from '../services/blogs'

const Blog = ({
  user, 
  blog, 
  setMessage, 
  setShowMessage,
}) => {
 
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const showWhenVisible = {display: visible ? '' : 'none'}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updateObject = {
      ...blog,
      likes: likes+1
    }
    const blogID = blog.id
    let response = await blogService.update(blogID, updateObject)
    setMessage('Like + 1')
    setLikes(response.likes)
    setShowMessage(true)
    setTimeout(() => {
      setMessage('')
      setShowMessage(null)
    }, 5000)
  }

  const handleRemove = async () => {
    const remove = window.confirm(`Do you want to delete blog ${blog.title} by ${blog.author}`)
    if(remove) {
      const response = await blogService.remove(blog.id)
      setMessage(response.message)
      setShowMessage(true)
      setTimeout(() => {
        setMessage('')
        setShowMessage(null)
    }, 5000)
    }
  }

  const displayDelete = () => {
    if(user.username === blog.user.username) {
      return <button onClick={handleRemove}>Remove</button>
    }
  }

  return (
    <div style={blogStyle} className="blogStyle">
      <div onClick={()=> toggleVisibility()}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenVisible} className="displayBlog">
        <div>{blog.url}</div>
        <div>
          {likes}
          <button onClick={handleLike}>Like this Blog</button>
        </div>
        <div>Added by {blog.user.name}</div>
        {displayDelete()}  
      </div>
    </div>

  )
}

export default Blog