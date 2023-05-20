const {model, Schema} = require('mongoose')

const waySchema = new Schema({
    title: String,
    name: String
})

module.exports = model('Way', waySchema)