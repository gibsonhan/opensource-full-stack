import React from 'react'
import { connect } from 'react-redux'

import { create } from '../reducers/blog'
import { sendMessage } from '../reducers/notification'
import { useField } from '../hooks'

import blogService from '../services/blogs'

const CreateBlog = (props) => {

    const title = useField('text')
    const author = useField('text')
    const url = useField('text') 
    
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const newBlog = {
                title: title.value,
                author: author.value,
                url: url.url,
            }
            await props.create(newBlog)
        }
        catch (exception) {
            props.sendMessage(exception.response.data.message)
        }
        finally {
            console.log('finally')
            title.reset()
            author.reset()
            url.reset()
        }
      
    } 

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={handleCreate}>
                <div> title
                    <input { ...title.input() }/>
                </div>
                <div>
                    author
                    <input { ...author.input()}/>
                    </div>
                <div>
                    url
                    <input { ...url.input()}/>
                </div>
                <button>Create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    create,
    sendMessage,
}

export default connect(
    null,
    mapDispatchToProps
)(CreateBlog)