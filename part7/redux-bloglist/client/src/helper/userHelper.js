export const uniqueBlogs  = (blogs) => {
		//extract blogs by username
		console.log(blogs)
		let blogsByUsername = blogs.map(blog => blog.user.username)
		blogsByUsername = Object.values(blogsByUsername)

		//count unique username, set is an object
		let uniqueBlogs = new Set(blogsByUsername)
		for(let name of uniqueBlogs) {
			uniqueBlogs[name] = 0
		}

		for(let name of blogsByUsername) {
			uniqueBlogs[name] +=1
		}
		//transform object into array that stores objects

		let uniqueArray = []
		for(let name in uniqueBlogs) {
			let newObject = {
				username: name,
				count: uniqueBlogs[name]
			}
			uniqueArray.push(newObject)	
		}
		return uniqueArray
	}	