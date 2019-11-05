const blogs = [
    {
        id: '23219371297398127',
        title: 'Hello World',
        author: 'Mr. World',
        likes: '9999'
    },
    {
        id: '232193wqeqewq398127',
        title: 'FaceBook',
        author: 'Mr. Mark',
        likes: '9231399'
    },
    {
        id: '232dfwfew39812fefe7',
        title: 'Hello World231',
        author: 'Mr. World1231',
        likes: '939'
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll }