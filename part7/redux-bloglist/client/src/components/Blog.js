import React, {useState} from 'react'
import { connect } from 'react-redux'
import { vote, remove } from '../reducers/blog'
import { sendMessage } from '../reducers/notification'

const Blog = (props) => {
  const { user, author, title, likes, url} = props.blog
  const [visible, setVisible]= useState(false)
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
    await props.vote(props.blog)
    props.sendMessage(`${title} +1 vote`, 'green', 5)
  }

  const handleRemove = async () => {
    const remove = window.confirm(`Do you want to delete blog ${title} by ${author}`)
    if(remove) {
      props.remove(props.blog)
      props.sendMessage(`${title} by ${author} was removed`, 'green', 10)
    }
  }

  const displayDelete = () => {
    let curr = window.localStorage.getItem('LoggedInBlogUser')
    curr = JSON.parse(curr)
    if(curr.username === user.username) {
      return <button onClick={handleRemove}>Remove</button>
    }
  }
  return (
    <div style={blogStyle} className="blog">
      <div onClick={()=> toggleVisibility()}>
        {title} {author}
      </div>
      <div style={showWhenVisible} className="displayBlog">
        <div>{url}</div>
        <div>
          {likes}
          <button onClick={handleLike}>Like this Blog</button>
        </div>
        <div>Added by {user.name}</div>
        { displayDelete() }  
      </div>
    </div>

  )
}

const mapDispatchToProps = {
  vote,
  remove,
  sendMessage,
}

export default connect (
  null,
  mapDispatchToProps,
)(Blog)