import React, {useState} from 'react';
import { connect } from 'react-redux';
import { remove } from '../reducers/blog';
import { sendMessage } from '../reducers/notification';
import { vote } from '../reducers/blog';

const Blog = (props) => {
    const {user, author, title, likes, url} = props.blog;
    const [visible, setVisible]= useState(false);
    const showWhenVisible = {display: visible ? '' : 'none'};
  
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const handleLike = async () => {
        await props.vote(props.blog);
        props.sendMessage(`${title} +1 vote`, 'green', 5);
    };

    const handleRemove = async () => {
        const remove = window.confirm(`Do you want to delete blog ${title} by ${author}`);
        if(remove) {
            props.remove(props.blog);
            props.sendMessage(`${title} by ${author} was removed`, 'green', 10);
        }
    };
  
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
                {(props.loginUser.username === props.blog.user.username)
                    ? <button onClick={handleRemove}>Remove</button>
                    : ''
                }  
            </div>
        </div>

    );
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.user
    };
};

const mapDispatchToProps = {
    vote,
    remove,
    sendMessage,
};

export default connect (
    mapStateToProps,
    mapDispatchToProps,
)(Blog);