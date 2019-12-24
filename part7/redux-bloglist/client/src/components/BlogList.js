import React from 'react'
import { connect } from 'react-redux'

import Blog from './Blog'
import blogService from '../services/blogs'
import Toggleable from './Toggleable'
import CreateBlog from './CreateBlog'

import { logoutUser } from '../reducers/login'

const BlogList = (props) => {

  const blogFormRef = React.createRef(null)
  const handleLogout = () => {
    window.localStorage.removeItem('LoggedInBlogUser')
    blogService.resetToken()
    props.logoutUser()
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
  console.log(props)
  return (
    <div>
      <h1>Blogs</h1>
      <div>{props.user.name} logged in :
        <button onClick={() => handleLogout()}> Logout</button>
      </div>
      <Toggleable buttonLabel="Create Blog" showBlogs={showBlogs()} ref={blogFormRef}>
        <CreateBlog blogFormRef={handleBlogRef}/>
      </Toggleable>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { 
    user: state.user,
    bloglist: state.blogs 
  }
}

const mapDispatchToProps = {
  logoutUser,
}

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(BlogList)