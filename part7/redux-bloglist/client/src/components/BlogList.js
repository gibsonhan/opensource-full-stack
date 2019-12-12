import React, { useState } from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'
import Message from './Message'
import blogService from '../services/blogs'
import Toggleable from './Toggleable'
import CreateBlog from './CreateBlog'

const BlogList = (props) => {

  const { user, setUser, blogs, setBlogs } = props
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
    const bloglist = props.bloglist;
    if(bloglist.length > 0 ) {
      
      //There is an issue with this?
      bloglist.sort((a, b) => {
        return b.likes - a.likes
      })

      return bloglist.map(blog => <Blog
        key={blog.id}
        blog={blog}
        /> )
    }
  }

  const handleBlogRef = () => {
    blogFormRef.current.toggleVisibility()
  }
  console.log(props.bloglist)
  return (
    <div>
      <h1>Blogs</h1>
      {(showMessage !== null) && <Message message={message} color = {mColor} />}
      <div>{user.name} logged in :
        <button onClick={() => handleLogout()}> Logout</button>
      </div>
      <Toggleable buttonLabel="Create Blog" showBlogs={showBlogs()} ref={blogFormRef}>
        <CreateBlog blogFormRef={handleBlogRef}/>
      </Toggleable>
      <button onClick={handleBlogRef}>Handle Ref</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { bloglist: state.blogs }
}

export default connect (
  mapStateToProps,
  null
)(BlogList)