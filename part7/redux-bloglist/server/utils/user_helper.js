const User = require('../models/User')

const _initalUsers = [
    {
        username: 'JackTheRipper',
        password: 'entering password',
        name: 'John Doe'
    },
    {
        username: 'HappyFeat',
        password: 'safe password',
        name: 'Robin Hood'
    }
]

const _newUser = {
    username: 'KimChi',
    passwordHash: '2313221',
    password: 'hello',
    name: 'Korean Emperor'
}

const _noUsernamePass = {
    name: 'Fighting'
}

const _duplicateUser = {
    username: "JackTheRipper",
    passwordHash: '233131',
    name: 'Helo World'
}

const _notLenReq = {
    username: 'Ki',
    password: 'o3'
}

const usersInDb = async () => {
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
    _noUsernamePass,
    _duplicateUser,
    _notLenReq,
    usersInDb,
    noPassHash,

}
