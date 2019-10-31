const tokenExtrator = (request, response, next) => {
    const authorization = request.get('authorization')

    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        let token = authorization.substring(7)
        request.token = token 
    }
    next()
}

module.exports = {
    tokenExtrator
}