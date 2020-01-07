export const uniqueBlogs  = (blogs) => {
    //extract blogs by username
    let blogsByUsername = blogs.map(blog => blog.user.username);
    blogsByUsername = Object.values(blogsByUsername);

    //count unique username, set is an object
    let uniqueBlogs = new Set(blogsByUsername);
    for(let name of uniqueBlogs) {
        uniqueBlogs[name] = 0;
    }

    for(let name of blogsByUsername) {
        uniqueBlogs[name] +=1;
    }
    //transform object into array that stores objects

    let uniqueArray = [];
    for(let name in uniqueBlogs) {
        let newObject = {
            username: name,
            count: uniqueBlogs[name]
        };
        uniqueArray.push(newObject);	
    }
	
    return uniqueArray;
};	

export const countingBlogs = (blogs) => {
    let blogsTable = blogs.map(blog => {
        return {
            id: blog.user.id,
            username: blog.user.username,
        };
    });


    let uniqueArray = [];
    let uniqueID = blogsTable.map(blog => blog.id);
    let uniqueSet = new Set(uniqueID);

    for(let id of uniqueSet) {
        let newObject = {
            id: id,
            username: setUserName(blogsTable, id),
            count: jsCount(blogsTable, id)
        };
        uniqueArray.push(newObject);
    }
    return uniqueArray;
};

const jsCount = (object, id) => {
    let count = object.filter(blog => blog.id === id);
    return count.length; 
};


const setUserName = (objects, id) => {
    let blog = objects.find(blog => blog.id === id);
    return blog.username;
};