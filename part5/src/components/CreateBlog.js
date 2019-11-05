import React, { useState } from 'react'

import blogService from '../services/blogs'

const CreateBlog = ({
    blogs,
    setBlogs,
    setMColor, 
    setMessage, 
    setShowMessage,
    blogFormRef    
    }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

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

    return (
        <div>
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
        </div>
    )
}

export default CreateBlog