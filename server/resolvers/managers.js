const jwt = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')
const Manager = require("../models/Manager");

const {validateLoginInput} = require('../utils/validation')

const generateToken = (user) => jwt.sign(
    {
        id: user.id,
        username: user.username
    },
    process.env.SECRET_KEY,
    {
        expiresIn: '1h'
    })

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const {errors, valid} = validateLoginInput(username, password)
            if(!valid) {
                throw new UserInputError('Some errors occurred', {errors})
            }

            const user = await Manager.findOne({username})
            if(!user) {
                throw new UserInputError('Пользователь не найден!', {errors})
            }

            if(password !== user.password) {
                throw new UserInputError('Неверные учетные данные!', {errors})
            }

            const token = generateToken(user)

            return {
                ...user._doc,
                id: user._id,
                token
            }
        }
    }
}