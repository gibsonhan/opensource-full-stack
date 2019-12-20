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
    props.setUser('')
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
  console.log(props.bloglist)
  return (
    <div>
      <h1>Blogs</h1>
      <div>{"Name"} logged in :
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

const mapDispatchToProps = {
  logoutUser,
}

export default connect (
  mapStateToProps,
  mapDispatchToProps,
)(BlogList)