import React, { useState } from 'react'
import Blog from './Blog'
import Message from './Message'
import blogService from '../services/blogs'
import Toggleable from './Toggleable'
import CreateBlog from './CreateBlog'

const BlogList = ({ user, setUser, blogs, setBlogs }) => {

  const blogFormRef = React.createRef(null)
  const [showMessage, setShowMessage] = useState(null)
  const [message, setMessage] = useState('')
  const [mColor, setMColor] = useState('green')

  const handleLogout = () => {
    window.localStorage.removeItem('LoggedInBlogUser')
    blogService.resetToken()
    setUser(null)
  }

  const showBlogs = () => {
    if(blogs.length > 0 ) {
      //const userBlogs = blogs.filter(blog => blog.user.username === user.username)
      const userBlogs = blogs
      userBlogs.sort((a, b) => {
        return b.likes - a.likes
      })

      return userBlogs.map(blog => <Blog
        user={user}
        key={blog.id}
        blog={blog}
        setShowMessage={setShowMessage}
        setMessage={setMessage}/> )
    }
  }

  const handleBlogRef = () => {
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h1>Blogs</h1>
      {(showMessage !== null) && <Message message={message} color = {mColor} />}
      <div>{user.name} logged in :
        <button onClick={() => handleLogout()}> Logout</button>
      </div>
      <Toggleable buttonLabel="Create Blog" showBlogs={showBlogs()} ref={blogFormRef}>
        <CreateBlog
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
          setMColor={setMColor}
          setShowMessage={setShowMessage}
          blogFormRef={handleBlogRef}
        />
      </Toggleable>
      <button onClick={handleBlogRef}>Handle Ref</button>
    </div>
  )
}
export default BlogList