import React from 'react';
import { connect } from 'react-redux';
import { useField } from '../hooks';

import { create } from '../reducers/blog';
import { sendMessage } from '../reducers/notification';

const CreateBlog = (props) => {
    const title = useField('text');
    const author = useField('text');
    const url = useField('text'); 
    
    const handleCreate = async (e) => {
        e.preventDefault();
        
        const newBlog = {
            title: title.input().value,
            author: author.input().value,
            url: url.input().value,
        };
        
        try {
            await props.create(newBlog);
            props.sendMessage(`New Blog: ${newBlog.title} by ${newBlog.author} was created`, 'green', 7);
        }
        catch (exception) {
            props.sendMessage(exception.response.data.message, 'red', 8);
        }
        finally {
            title.reset();
            author.reset();
            url.reset();
        }
      
    }; 

    return (
        <div>
            <h2>Create New</h2>
            <div>
                <p>{title.input().value}</p>
                <p>{author.input().value}</p>
                <p>{url.input().value}</p>
            </div>
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
    );
};

const mapDispatchToProps = {
    create,
    sendMessage,
};

export default connect(
    null,
    mapDispatchToProps
)(CreateBlog);