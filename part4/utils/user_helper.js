const User = require('../models/User')

const _initalUsers = [
    {
        username: 'JackTheRipper',
        passwordHash: '9x9x119x',
        name: 'John Doe'
    },
    {
        username: 'HappyFeat',
        passwordHash: '930438420340',
        name: 'Robin Hood'
    }
]

const _newUser = {
    username: 'KimChi',
    passwordHash: '2313221',
    name: 'Korean Emperor'
}

const _duplicateUser = {
    username: "JackTheRipper",
    passwordHash: '233131',
    name: 'Helo World'
}

const userInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const noPassHash = user => {
    return user.passwordHash === undefined
        ? undefined
        : true
}
module.exports = {
    _initalUsers,
    _newUser,
    _duplicateUser,
    userInDb,
    noPassHash,
}