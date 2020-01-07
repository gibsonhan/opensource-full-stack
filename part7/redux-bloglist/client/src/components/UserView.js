import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

const UserView = (props) => {
    const blogs = props.blogs.filter(blog => blog.user.id === props.path);
    return (
        <div className="user_view">
            <h1> Blogs Created</h1>
            <ul>
                {blogs.map(blog => <ListTitle key={blog.id} blog={blog} />)}
            </ul>
        </div>
    );
};


const ListTitle = (props) => {
    const idPath = props.blog.id;
    return (
        <li>
            <Link to ={`/blogs/${idPath}`}>{props.blog.title}</Link>
        </li>
    );
};

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
    };
};

export default  connect (
    mapStateToProps,
    null,
) (UserView);

/**
 * 
				{props.blogs.map(blog => <ListTiterse key={blog.id} title ={blog.title} />)}
 * 
 */