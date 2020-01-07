import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { countingBlogs } from '../helper/userHelper';

const Users = (props) => {
    const blogs = countingBlogs(props.blogs);
    return (
        <div className='basic-info'>
            <table>
                <thead>
                    <tr>
                        <th>Blogs by User</th>
                        <th>Number of blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.map(blog => <RowInfo key={blog.id} blog={blog} />)}
                </tbody>
            </table>
        </div>
    );
};

const RowInfo = (props) => {
    const {username, count, id} = props.blog;
    const path = `/users/${id}`;
    return(
        <tr>
            <td>
                <Link to ={path}>{username}</Link> 
            </td>
            <td >{username}</td>
            <td>{count}</td>
        </tr>
    );
};


const mapStateToProps = (state) => {
    return { 
        current : state.user,
        blogs: state.blogs,
    };
};

export default connect (
    mapStateToProps,
    null,
) ( Users );