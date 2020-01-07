import React from 'react';
import { connect } from 'react-redux';

import Comment from '../components/Comment';
import CommentList from '../components/CommentList';

import { vote } from '../reducers/blog';
import { sendMessage } from '../reducers/notification';

const BlogView = (props) => {
    const blog = props.blogs.find(blog => blog.id === props.path);
    if(!blog) {
        return <></>;
    }

    const handleLike = async () => {
        await props.vote(blog);
        props.sendMessage(`${blog.title} + 1 vote`, 'green', 6);
    };
	
    const commentCounter = () => {
        let value = 0;
        if(props.comments[id] !==  undefined) {
            value = props.comments[id].length;
        }
        return value;
    };
	
    const id = props.path;
    return (
        <div className="blog-view">
            <h2>{blog.title}</h2>
            <p>{blog.url}</p>
            <p>number of likes {blog.likes}</p>
            <p>Created by {blog.author}</p>
            <button onClick={handleLike}>Like</button>

            <Comment numComment={commentCounter()} blogID={id}/>
            <CommentList comments={props.comments[id]} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        comments: state.comments
    };
};

const mapDispatchToProps = {
    sendMessage,
    vote,
};

export default connect (
    mapStateToProps,
    mapDispatchToProps,
) ( BlogView );