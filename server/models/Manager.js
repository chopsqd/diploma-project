const {model, Schema} = require('mongoose')

const managerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = model('Manager', managerSchema)