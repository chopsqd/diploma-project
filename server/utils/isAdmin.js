const {AuthenticationError} = require('apollo-server')
const jwt = require('jsonwebtoken')

module.exports = (context) => {
    // context = { ... headers }
    const authHeader = context.req.headers.authorization
    if(authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if(token) {
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY)
                return user
            } catch (error) {
                throw new AuthenticationError('Invalid/Expired token!')
            }
        }
        throw new Error('Authentication token is wrong!')
    }
    throw new Error('Отсутствует токен авторизации!')
}