import React, { useState } from 'react'
import Blog from './Blog'
import Message from './Message'
import blogService from '../services/blogs'

const BlogList = ({ user, setUser, blogs, setBlogs}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    
    const [showMessage, setShowMessage] = useState(null)
    const [message, setMessage] = useState('')
    const [mColor, setMColor] = useState('green')
    

    const handleLogout = () => {
        window.localStorage.removeItem('LoggedInBlogUser')
        blogService.resetToken()
        setUser(null)
    }
    const handleCreate = async (e) => {
        e.preventDefault()
        try {

            const newBlog = {
                title: title,
                author: author,
                url: url
            }

            const response = await blogService.create(newBlog)
            setBlogs(blogs.concat(response))
            setMessage(`A New Blog: ${newBlog.title} by ${newBlog.author} added`)
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(null)
            }, 5000)
        }
        catch (exception) {
            setMessage(exception.response.data.message)
            setMColor('red')
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(null)
                setMColor('green')
            }, 5000)
        }

        setTitle('')
        setAuthor('')
        setUrl('')
    }
    
    const showBlogs = () => {
        if(blogs.length > 0 ) {
            const userBlogs = blogs.filter(blog => blog.user.username === user.username)
            return userBlogs.map(blog => <Blog key={blog.id} blog={blog}/> )
        }
    }

    return (
        <div>
            <h1>Blogs</h1>
            {(showMessage !== null) && <Message message={message} color = {mColor} />}
            <div>{user.name} logged in :
                <button onClick={() => handleLogout()}> Logout</button>
            </div>

            <h2>Create New</h2>
            <form onSubmit={handleCreate}>
                <div> title
                    <input
                        type='text'
                        value={title}
                        name={"Title"}
                        onChange={({ target }) => { setTitle(target.value) }}
                    />
                </div>
                <div>
                    author
                    <input
                        type='text'
                        value={author}
                        name='Author'
                        onChange={({ target }) => { setAuthor(target.value) }}
                    />
                    </div>
                <div>
                    url
                    <input
                        type='text'
                        value={url}
                        name='Url'
                        onChange={({ target }) => { setUrl(target.value) }}
                    />
                </div>
                <button>Create</button>
            </form>
            {showBlogs()}
        </div>
    )
}
export default BlogList