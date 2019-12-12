import React from 'react'
import PropType from 'prop-types'

import { useField } from '../hooks'
import blogService from '../services/blogs'

const CreateBlog = () => {

    const title = useField('text')
    const author = useField('text')
    const url = useField('text') 
    
    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const newBlog = {
                title: title.value,
                author: author.value,
                url: url.value
            }

            title.reset()
            author.reset()
            url.reset()
        }
        catch (exception) {
            console.long(exception)
        }
    } 

    return (
        <div>
            <h2>Create New</h2>
            {console.log(title.value)}
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

CreateBlog.propTypes = {
    blogs : PropType.array.isRequired,
    setBlogs: PropType.func.isRequired,
    setMColor: PropType.func.isRequired,
    setMessage: PropType.func.isRequired,
    setShowMessage: PropType.func.isRequired

}

export default CreateBlog